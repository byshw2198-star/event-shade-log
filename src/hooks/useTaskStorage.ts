import { useState, useEffect } from "react";
import { Task } from "@/types/task";

const STORAGE_KEY = "task-tracker-data";

const DEFAULT_TASKS: Task[] = [
  { id: "exercise", name: "التمارين", data: {} },
  { id: "study", name: "الدراسة لمدة ٣٠ دقيقة", data: {} },
];

export function useTaskStorage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(DEFAULT_TASKS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TASKS));
    }
  }, []);

  const updateTask = (taskId: string, data: Record<string, string>) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === taskId ? { ...task, data } : task
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getTask = (taskId: string): Task | undefined => {
    return tasks.find((task) => task.id === taskId);
  };

  return { tasks, updateTask, getTask };
}
