import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type Task = { _id: string; title: string; description: string; column: 'todo' | 'doing' | 'done' };

const columns: Array<{ key: Task['column'] }> = [
  { key: 'todo' },
  { key: 'doing' },
  { key: 'done' },
];

function TaskCard({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id, data: { task } });
  const style: React.CSSProperties = {
    background: '#ffffff', color: '#111827', padding: 10, marginBottom: 10, borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', cursor: 'grab',
    transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.85 : 1,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
          <span {...listeners} {...attributes} title="Arrastrar" style={{ cursor: 'grab', userSelect: 'none' }}>↕</span>
          <strong style={{ flex: 1 }}>{task.title}</strong>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(task._id); }}
          title="Eliminar"
          style={{ border: '1px solid #e5e7eb', background: '#f9fafb', color: '#6b7280', borderRadius: 6, padding: '2px 6px', cursor: 'pointer' }}
          aria-label="Eliminar tarea"
        >✕</button>
      </div>
      <div style={{ fontSize: 12, color: '#4b5563', marginTop: 4 }}>{task.description}</div>
    </div>
  );
}

function Column({ id, title, children, onRename }: { id: Task['column']; title: string; children: React.ReactNode; onRename: (id: Task['column']) => void }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style: React.CSSProperties = {
    background: isOver ? '#e8f0fe' : '#f3f4f6', padding: 12, borderRadius: 10, minHeight: 240,
    border: '1px solid #e5e7eb'
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: '#111827' }}>{title}</h3>
        <button onClick={() => onRename(id)} title="Renombrar columna" style={{ border: '1px solid #e5e7eb', background: '#ffffff', borderRadius: 6, padding: '2px 6px', cursor: 'pointer' }}>✎</button>
      </div>
      {children}
    </div>
  );
}

export function Kanban({ tasks, onMove, onDelete, columnTitles, onRenameColumn }: { tasks: Task[]; onMove: (id: string, column: Task['column']) => void; onDelete: (id: string) => void; columnTitles: Record<Task['column'], string>; onRenameColumn: (id: Task['column'], newTitle: string) => void }) {
  const byCol: Record<Task['column'], Task[]> = { todo: [], doing: [], done: [] };
  tasks.forEach(t => byCol[t.column].push(t));

  const handleDragEnd = (e: DragEndEvent) => {
    const id = String(e.active.id);
    const toCol = (e.over?.id ?? '') as Task['column'];
    if (toCol && ['todo','doing','done'].includes(toCol) && tasks.find(t => t._id === id)?.column !== toCol) {
      onMove(id, toCol);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {columns.map(c => (
          <Column key={c.key} id={c.key} title={columnTitles[c.key]} onRename={(id) => {
            const next = window.prompt('Nuevo título', columnTitles[id]);
            if (next && next.trim()) onRenameColumn(id, next.trim());
          }}>
            {byCol[c.key].map(t => <TaskCard key={t._id} task={t} onDelete={onDelete} />)}
          </Column>
        ))}
      </div>
    </DndContext>
  );
}
