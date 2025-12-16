import { Link, useLocation } from "react-router-dom";
import { Task } from "@/types/task";
import { CheckCircle2, Home } from "lucide-react";

interface TaskNavProps {
  tasks: Task[];
}

export function TaskNav({ tasks }: TaskNavProps) {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-4 p-4 bg-card border-b border-border">
      <Link
        to="/"
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg cell-transition
          ${location.pathname === "/" 
            ? "bg-primary text-primary-foreground" 
            : "hover:bg-secondary text-foreground"
          }
        `}
      >
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </Link>

      <div className="h-6 w-px bg-border" />

      {tasks.map((task) => (
        <Link
          key={task.id}
          to={`/task/${task.id}`}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg cell-transition
            ${location.pathname === `/task/${task.id}` 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-secondary text-foreground"
            }
          `}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{task.name}</span>
        </Link>
      ))}
    </nav>
  );
}
