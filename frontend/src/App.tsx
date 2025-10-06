import { useEffect, useState } from 'react';
import type { Task } from './components/Kanban';
import { Kanban } from './components/Kanban';
import { api } from './lib/api';
import { connectSocket } from './lib/ws';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    api<Task[]>('/tasks').then(setTasks);
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

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Kanban</h2>
        <button onClick={() => api('/export/backlog', { method: 'POST' })}>Exportar Backlog</button>
      </div>
      <Kanban tasks={tasks} onMove={onMove} />
    </div>
  );
}

export default App;
