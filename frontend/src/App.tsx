import { useEffect, useState } from 'react';
import type { Task } from './components/Kanban';
import { Kanban } from './components/Kanban';
import { api } from './lib/api';
import { connectSocket } from './lib/ws';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    api<Task[]>('/tasks').then((list) => {
      if (!list || list.length === 0) {
        // Sembrar dos tareas demo para experiencia inicial
        Promise.all([
          api<Task>('/tasks', { method: 'POST', body: JSON.stringify({ title: 'Diseñar wireframes', description: 'Pantallas principales', column: 'todo' }) }),
          api<Task>('/tasks', { method: 'POST', body: JSON.stringify({ title: 'Configurar CI', description: 'Pipeline básico', column: 'doing' }) })
        ]).then((created) => setTasks(created)).catch(() => setTasks([]));
      } else {
        setTasks(list);
      }
    });
    const socket = connectSocket();
    socket.on('task:created', (t: Task) => setTasks(prev => [...prev, t]));
    socket.on('task:updated', (t: Task) => setTasks(prev => prev.map(p => p._id === t._id ? t : p)));
    socket.on('task:deleted', ({ id }: { id: string }) => setTasks(prev => prev.filter(p => p._id !== id)));
    return () => { socket.disconnect(); };
  }, []);

  const onMove = async (id: string, column: Task['column']) => {
    const prev = tasks;
    setTasks(p => p.map(t => t._id === id ? { ...t, column } : t));
    try { await api<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ column }) }); }
    catch { setTasks(prev); }
  };

  const [columnTitles, setColumnTitles] = useState<{ todo: string; doing: string; done: string }>({
    todo: 'Por hacer',
    doing: 'En progreso',
    done: 'Hecho',
  });

  const onCreate = async () => {
    const title = window.prompt('Título de la tarea');
    if (!title || !title.trim()) return;
    const description = window.prompt('Descripción (opcional)') ?? '';
    try {
      const created = await api<Task>('/tasks', {
        method: 'POST',
        body: JSON.stringify({ title: title.trim(), description })
      });
      setTasks(prev => [...prev, created]);
    } catch {
      // sin acción; el evento realtime también actualizará el estado si procede
    }
  };

  return (
    <div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>Tablero Kanban</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCreate} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#111827', color: 'white' }}>Nueva tarea</button>
          <button onClick={async () => {
            try {
              const res = await api<{ ok: boolean; error?: string }>('/export/backlog', { method: 'POST' });
              if (!res.ok) alert(res.error ?? 'No se pudo exportar');
              else alert('Exportación solicitada correctamente');
            } catch {
              alert('No se pudo exportar');
            }
          }} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', background: 'white' }}>Exportar backlog</button>
        </div>
      </div>
      <Kanban
        tasks={tasks}
        onMove={onMove}
        onDelete={async (id: string) => {
          if (!window.confirm('¿Eliminar esta tarea?')) return;
          const prev = tasks;
          setTasks(p => p.filter(t => t._id !== id));
          try {
            await api(`/tasks/${id}`, { method: 'DELETE' });
          } catch {
            setTasks(prev);
            alert('No se pudo eliminar');
          }
        }}
        columnTitles={columnTitles}
        onRenameColumn={(id, newTitle) => setColumnTitles(prev => ({ ...prev, [id]: newTitle }))}
      />
    </div>
  );
}

export default App;
