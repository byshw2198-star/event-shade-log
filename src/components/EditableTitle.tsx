import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Pencil, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EditableTitle() {
  const { title, setTitle } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleSave = () => {
    if (tempTitle.trim()) {
      setTitle(tempTitle.trim());
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          className="text-5xl font-bold h-auto py-1 px-2 bg-transparent border-primary/50 text-center max-w-[200px]"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setTempTitle(title);
              setIsEditing(false);
            }
          }}
        />
        <Button size="icon" variant="ghost" onClick={handleSave}>
          <Check className="w-5 h-5 text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setTempTitle(title);
        setIsEditing(true);
      }}
      className="group inline-flex items-center gap-2 hover:opacity-80 cell-transition"
    >
      <h1 className="text-5xl font-bold text-foreground">{title}</h1>
      <Pencil className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 cell-transition" />
    </button>
  );
}