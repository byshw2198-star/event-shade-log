import { PALETTE_COLORS, ColorOption } from "@/types/task";
import { Eraser } from "lucide-react";

interface ColorPaletteProps {
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
}

export function ColorPalette({ selectedColor, onSelectColor }: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-card rounded-lg border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">اختر اللون</h3>
      
      <div className="flex flex-col gap-2">
        {PALETTE_COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelectColor(color.value)}
            className={`
              flex items-center gap-3 p-2 rounded-md cell-transition
              ${selectedColor === color.value 
                ? "ring-2 ring-ring ring-offset-2 ring-offset-background" 
                : "hover:bg-secondary"
              }
            `}
          >
            <div
              className="w-6 h-6 rounded-md"
              style={{ backgroundColor: color.cssVar }}
            />
            <span className="text-sm">{color.name}</span>
          </button>
        ))}
        
        <button
          onClick={() => onSelectColor(null)}
          className={`
            flex items-center gap-3 p-2 rounded-md cell-transition
            ${selectedColor === null 
              ? "ring-2 ring-ring ring-offset-2 ring-offset-background" 
              : "hover:bg-secondary"
            }
          `}
        >
          <div className="w-6 h-6 rounded-md bg-cell-empty flex items-center justify-center">
            <Eraser className="w-4 h-4 text-muted-foreground" />
          </div>
          <span className="text-sm">مسح</span>
        </button>
      </div>
    </div>
  );
}
