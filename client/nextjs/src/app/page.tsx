"use client";

/**
 * Todo workspace.
 * Provides a focused, local-first todo list with search, filtering, and todo actions.
 */

import {
  Archive,
  Contrast,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  ClipboardList,
  ListFilter,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type Priority = "low" | "medium" | "high";
type StatusFilter = "all" | "active" | "completed";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

const initialTasks: Task[] = [
  {
    id: "welcome-todo",
    title: "Make a plan for the week",
    description: "Break your biggest goals into small, achievable steps.",
    priority: "high",
    dueDate: "",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-todo",
    title: "Explore the todo list",
    description: "Try searching, filtering, and completing a task.",
    priority: "medium",
    dueDate: "",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

const priorityStyles: Record<Priority, string> = {
  low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  high: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

function formatDueDate(value: string) {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Priority,
    dueDate: "",
  });

  useEffect(() => {
    const savedTasks = window.localStorage.getItem("todo-app-items");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks) as Task[]);
      } catch {
        window.localStorage.removeItem("todo-app-items");
      }
    }
  }, []);

  useEffect(() => {
    setHighContrast(window.localStorage.getItem("task-manager-high-contrast") === "true");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("todo-app-items", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const matchesStatus =
        status === "all" ||
        (status === "active" && !task.completed) ||
        (status === "completed" && task.completed);
      return matchesSearch && matchesStatus;
    });
  }, [search, status, tasks]);

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTask.title.trim();
    if (!title) return;

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title,
        description: newTask.description.trim(),
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setNewTask({ title: "", description: "", priority: "medium", dueDate: "" });
    setIsFormOpen(false);
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function removeTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <main className={`min-h-screen bg-background ${highContrast ? "high-contrast" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Daily todo list
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Your todos, <span className="text-primary">organized.</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Capture what matters, keep momentum, and finish your day with clarity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const nextValue = !highContrast;
                setHighContrast(nextValue);
                window.localStorage.setItem("task-manager-high-contrast", String(nextValue));
              }}
              aria-pressed={highContrast}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 font-semibold transition hover:bg-accent"
            >
              <Contrast className="h-5 w-5" />
              {highContrast ? "Standard contrast" : "High contrast"}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <Plus className="h-5 w-5" />
              Add todo
            </button>
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total todos" value={tasks.length} icon={<ClipboardList />} />
          <StatCard label="To do" value={activeCount} icon={<Circle />} />
          <StatCard label="Done" value={completedCount} icon={<CheckCircle2 />} />
        </section>

        <section className="rounded-3xl border border-border/60 bg-card/80 p-4 shadow-xl shadow-primary/5 sm:p-6">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search todos..."
                className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <ListFilter className="h-4 w-4 shrink-0 text-muted-foreground" />
              {(["all", "active", "completed"] as StatusFilter[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                    status === option
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className={`group flex gap-3 rounded-2xl border p-4 transition hover:border-primary/40 ${
                    task.completed
                      ? "border-border/40 bg-muted/20"
                      : "border-border/70 bg-background"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-label={task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      task.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40 text-transparent hover:border-primary"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className={`font-semibold ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                        {task.title}
                      </h2>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="self-start rounded-lg p-2 text-muted-foreground opacity-0 transition hover:bg-rose-500/10 hover:text-rose-500 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
              <Archive className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <h2 className="font-semibold">No tasks found</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try another search or add a todo to get started.
              </p>
            </div>
          )}
        </section>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <form onSubmit={addTask} className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add a todo</h2>
                <p className="mt-1 text-sm text-muted-foreground">What would you like to accomplish?</p>
              </div>
              <button type="button" onClick={() => setIsFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                autoFocus
                required
                value={newTask.title}
                onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}
                placeholder="Todo title"
                className="h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <textarea
                value={newTask.description}
                onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
                placeholder="Add a note (optional)"
                rows={3}
                className="w-full resize-none rounded-xl border border-input bg-background p-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium">
                  Priority
                  <select
                    value={newTask.priority}
                    onChange={(event) => setNewTask({ ...newTask, priority: event.target.value as Priority })}
                    className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 font-normal outline-none focus:border-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="text-sm font-medium">
                  Due date
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(event) => setNewTask({ ...newTask, dueDate: event.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 font-normal outline-none focus:border-primary"
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="mt-6 h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:bg-primary/90">
              Add todo
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</span>
      </div>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}
