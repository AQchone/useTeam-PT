import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type Task = { _id: string; title: string; description: string; column: 'todo' | 'doing' | 'done' };

const columns: Array<{ key: Task['column']; title: string }> = [
  { key: 'todo', title: 'To Do' },
  { key: 'doing', title: 'Doing' },
  { key: 'done', title: 'Done' },
];

function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id, data: { task } });
  const style: React.CSSProperties = {
    background: 'white', padding: 8, marginBottom: 8, borderRadius: 6,
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)', cursor: 'grab',
    transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{task.title}</strong>
      <div style={{ fontSize: 12, color: '#666' }}>{task.description}</div>
    </div>
  );
}

function Column({ id, title, children }: { id: Task['column']; title: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style: React.CSSProperties = {
    background: isOver ? '#e8f0fe' : '#f7f7f7', padding: 12, borderRadius: 8, minHeight: 200,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}

export function Kanban({ tasks, onMove }: { tasks: Task[]; onMove: (id: string, column: Task['column']) => void }) {
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
          <Column key={c.key} id={c.key} title={c.title}>
            {byCol[c.key].map(t => <TaskCard key={t._id} task={t} />)}
          </Column>
        ))}
      </div>
    </DndContext>
  );
}
