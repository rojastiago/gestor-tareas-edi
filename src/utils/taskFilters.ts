
import type { Task, TaskStatus } from '../types/task';

export function filterTasks(tasks: Task[], query: string, status: TaskStatus): Task[] {
  const byStatus = tasks.filter((task) => {
    if (status === 'pendientes') return !task.completed;
    if (status === 'completadas') return task.completed;
    return true;
  });

  const normalizedQuery = query.trim().toLowerCase();

  return byStatus.filter((task) =>
    task.title.toLowerCase().includes(normalizedQuery)
  );
}
