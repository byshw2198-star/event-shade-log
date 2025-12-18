import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTaskStore } from "@/contexts/TaskStorageContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Plus, Trash2, Pencil, X } from "lucide-react";
import { DAYS_IN_MONTH } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { EditableTitle } from "@/components/EditableTitle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Task } from "@/types/task";

const EMOJI_OPTIONS = ["📋", "💪", "📚", "🏃", "🎯", "✨", "🎨", "💼", "🎵", "🍎", "💧", "🧘"];

const Index = () => {
  const { tasks, addTask, deleteTask, updateTaskImage, updateTaskName, updateTaskIcon } = useTaskStore();
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskIcon, setNewTaskIcon] = useState("📋");
  const navigate = useNavigate();
  const totalDays = DAYS_IN_MONTH.reduce((a, b) => a + b, 0);

  // Edit task state
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [editImage, setEditImage] = useState<string | undefined>(undefined);

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTaskId = addTask(newTaskName.trim(), newTaskIcon);
      setNewTaskName("");
      setNewTaskIcon("📋");
      setIsDialogOpen(false);
      navigate(`/task/${newTaskId}`);
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setEditName(task.name);
    setEditIcon(task.icon || "📋");
    setEditImage(task.image);
  };

  const closeEditDialog = () => {
    setEditingTask(null);
    setEditName("");
    setEditIcon("");
    setEditImage(undefined);
  };

  const handleSaveEdit = () => {
    if (!editingTask || !editName.trim()) return;
    updateTaskName(editingTask.id, editName.trim());
    updateTaskIcon(editingTask.id, editIcon);
    updateTaskImage(editingTask.id, editImage);
    closeEditDialog();
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : undefined;
      setEditImage(result);
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">{t.trackDailyHabits}</span>
          </div>
          
          <div className="flex justify-center mb-4">
            <EditableTitle />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.recordDailyAchievements}
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tasks.map((task, index) => {
            const filledDays = Object.keys(task.data).length;
            const completionRate = Math.round((filledDays / totalDays) * 100);

            return (
              <div
                key={task.id}
                className="group bg-card rounded-xl border border-border p-6 cell-transition hover:border-primary/50 hover:glow-effect animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute top-4 ${language === "ar" ? "left-4" : "right-4"} flex items-center gap-1`}>
                  {/* Edit Button */}
                  <button
                    onClick={() => openEditDialog(task)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg cell-transition"
                    title={t.editTask}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg cell-transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card">
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t.deleteTask}</AlertDialogTitle>
                        <AlertDialogDescription>{t.deleteTaskConfirm}</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteTask(task.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {t.delete}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Link to={`/task/${task.id}`} className="block">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg group-hover:bg-primary/30 cell-transition flex items-center justify-center text-2xl overflow-hidden">
                      {task.icon || "📋"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-foreground truncate">{task.name}</h2>
                        {task.image ? (
                          <img
                            src={task.image}
                            alt={language === "ar" ? `صورة مهمة ${task.name}` : `Task image for ${task.name}`}
                            loading="lazy"
                            className="h-6 w-6 rounded-md border border-border object-cover"
                          />
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {filledDays} {t.daysRecorded}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t.progress}</span>
                      <span className="text-primary font-medium">{completionRate}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full cell-transition"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

          {/* Add Task Card */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-card rounded-xl border-2 border-dashed border-border p-6 cell-transition hover:border-primary/50 flex flex-col items-center justify-center gap-4 min-h-[180px]">
                <div className="p-4 bg-secondary rounded-full">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground font-medium">{t.addNewTask}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle>{t.addNewTask}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.taskName}</label>
                  <Input
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder={t.taskNamePlaceholder}
                    className="bg-background"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTask();
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.taskIcon}</label>
                  <div className="grid grid-cols-6 gap-2">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewTaskIcon(emoji)}
                        className={`
                          w-10 h-10 rounded-lg text-xl flex items-center justify-center cell-transition
                          ${newTaskIcon === emoji 
                            ? "bg-primary text-primary-foreground ring-2 ring-ring" 
                            : "bg-secondary hover:bg-secondary/80"
                          }
                        `}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={handleAddTask} 
                  className="w-full"
                  disabled={!newTaskName.trim()}
                >
                  {t.addTask}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Task Dialog */}
        <Dialog open={!!editingTask} onOpenChange={(open) => !open && closeEditDialog()}>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>{t.editTask}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Task Name */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{t.taskName}</label>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder={t.taskNamePlaceholder}
                  className="bg-background"
                />
              </div>

              {/* Task Icon */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{t.taskIcon}</label>
                <div className="grid grid-cols-6 gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setEditIcon(emoji)}
                      className={`
                        w-10 h-10 rounded-lg text-xl flex items-center justify-center cell-transition
                        ${editIcon === emoji 
                          ? "bg-primary text-primary-foreground ring-2 ring-ring" 
                          : "bg-secondary hover:bg-secondary/80"
                        }
                      `}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Image */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{t.taskImage}</label>
                <div className="flex items-center gap-3">
                  {editImage ? (
                    <div className="relative">
                      <img
                        src={editImage}
                        alt={t.taskImage}
                        className="h-16 w-16 rounded-lg border border-border object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setEditImage(undefined)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null}
                  <label className="flex-1 flex items-center justify-center h-16 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 cell-transition">
                    <span className="text-sm text-muted-foreground">
                      {editImage ? t.removeImage : t.taskImage}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleEditImageChange}
                    />
                  </label>
                </div>
              </div>

              <Button 
                onClick={handleSaveEdit} 
                className="w-full"
                disabled={!editName.trim()}
              >
                {t.save}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-2 p-6 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">
              {t.chooseTaskToStart}
            </p>
            <p className="text-sm text-muted-foreground/70">
              {t.clickCellToColor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
