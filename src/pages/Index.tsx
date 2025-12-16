import { Link } from "react-router-dom";
import { useTaskStorage } from "@/hooks/useTaskStorage";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { DAYS_IN_MONTH } from "@/types/task";

const Index = () => {
  const { tasks } = useTaskStorage();
  const totalDays = DAYS_IN_MONTH.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">تتبع عاداتك اليومية</span>
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-4">
            متتبع المهام السنوي
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            سجّل إنجازاتك اليومية على مدار السنة بتصميم بسيط وجميل
          </p>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tasks.map((task, index) => {
            const filledDays = Object.keys(task.data).length;
            const completionRate = Math.round((filledDays / totalDays) * 100);

            return (
              <Link
                key={task.id}
                to={`/task/${task.id}`}
                className="group bg-card rounded-xl border border-border p-6 cell-transition hover:border-primary/50 hover:glow-effect animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 cell-transition">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {task.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {filledDays} يوم مسجل
                      </p>
                    </div>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 cell-transition" />
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التقدم</span>
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
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-2 p-6 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">
              اختر مهمة للبدء في تتبع تقدمك اليومي
            </p>
            <p className="text-sm text-muted-foreground/70">
              انقر على أي خلية لتلوينها • استخدم لوحة الألوان لاختيار اللون المناسب
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
