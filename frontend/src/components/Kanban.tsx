import React, { useCallback, useMemo } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type Task = { _id: string; title: string; description: string; column: 'todo' | 'doing' | 'done' };

const columns: Array<{ key: Task['column'] }> = [
  { key: 'todo' },
  { key: 'doing' },
  { key: 'done' },
];

const TaskCard = React.memo(function TaskCard({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id, data: { task } });
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.85 : 1,
  };
  return (
    <div ref={setNodeRef} style={style} className="task-card">
      <div className="task-card__header">
        <div className="task-card__title">
          <span {...listeners} {...attributes} title="Arrastrar" className="task-card__drag">↕</span>
          <strong className="task-card__name">{task.title}</strong>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); onDelete(task._id); }}
          title="Eliminar"
          className="btn btn-icon"
          aria-label="Eliminar tarea"
        >✕</button>
      </div>
      <div className="task-card__desc">{task.description}</div>
    </div>
  );
});

const Column = React.memo(function Column({ id, title, children, onRename }: { id: Task['column']; title: string; children: React.ReactNode; onRename: (id: Task['column']) => void }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`kanban-column ${isOver ? 'kanban-column--over' : ''}`}>
      <div className="kanban-column__header">
        <h3 className="kanban-column__title">{title}</h3>
        <button onClick={() => onRename(id)} title="Renombrar columna" className="btn btn-icon">✎</button>
      </div>
      {children}
    </div>
  );
});

export function Kanban({ tasks, onMove, onDelete, columnTitles, onRenameColumn }: { tasks: Task[]; onMove: (id: string, column: Task['column']) => void; onDelete: (id: string) => void; columnTitles: Record<Task['column'], string>; onRenameColumn: (id: Task['column'], newTitle: string) => void }) {
  const byCol = useMemo(() => {
    const grouped: Record<Task['column'], Task[]> = { todo: [], doing: [], done: [] };
    tasks.forEach(t => grouped[t.column].push(t));
    return grouped;
  }, [tasks]);

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const id = String(e.active.id);
    const toCol = (e.over?.id ?? '') as Task['column'];
    if (toCol && ['todo','doing','done'].includes(toCol) && tasks.find(t => t._id === id)?.column !== toCol) {
      onMove(id, toCol);
    }
  }, [onMove, tasks]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanban-grid">
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
