import { DAYS_IN_MONTH, CustomColor } from "@/types/task";
import { TrendingUp, Calendar, Target, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TaskStatsProps {
  data: Record<string, string>;
  colors: CustomColor[];
}

export function TaskStats({ data, colors }: TaskStatsProps) {
  const { t } = useLanguage();
  const totalDays = DAYS_IN_MONTH.reduce((a, b) => a + b, 0);
  const filledDays = Object.keys(data).length;
  const completionRate = totalDays > 0 ? Math.round((filledDays / totalDays) * 100) : 0;

  // Count each color usage
  const colorCounts = colors.reduce((acc, color) => {
    acc[color.id] = Object.values(data).filter((v) => v === color.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4 mb-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t.recordedDays}</p>
              <p className="text-2xl font-bold">{filledDays}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t.completionRate}</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t.remainingDays}</p>
              <p className="text-2xl font-bold">{totalDays - filledDays}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Statistics */}
      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">{t.colorStats}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {colors.map((color) => (
            <div
              key={color.id}
              className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
            >
              <div
                className="w-6 h-6 rounded-full shrink-0"
                style={{ backgroundColor: `hsl(${color.hue}, 70%, 50%)` }}
              />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{color.name}</p>
                <p className="text-lg font-bold">{colorCounts[color.id] || 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
