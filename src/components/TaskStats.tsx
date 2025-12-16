import { PALETTE_COLORS, DAYS_IN_MONTH } from "@/types/task";
import { TrendingUp, Calendar, Target } from "lucide-react";

interface TaskStatsProps {
  data: Record<string, string>;
}

export function TaskStats({ data }: TaskStatsProps) {
  const totalDays = DAYS_IN_MONTH.reduce((a, b) => a + b, 0);
  const filledDays = Object.keys(data).length;
  const completionRate = totalDays > 0 ? Math.round((filledDays / totalDays) * 100) : 0;

  const colorCounts = PALETTE_COLORS.reduce((acc, color) => {
    acc[color.value] = Object.values(data).filter((v) => v === color.value).length;
    return acc;
  }, {} as Record<string, number>);

  const mostUsedColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">الأيام المسجلة</p>
            <p className="text-2xl font-bold">{filledDays}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">نسبة الإنجاز</p>
            <p className="text-2xl font-bold">{completionRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-palette-green/20 rounded-lg">
            <Target className="w-5 h-5 text-palette-green" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">الأيام المتبقية</p>
            <p className="text-2xl font-bold">{totalDays - filledDays}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
