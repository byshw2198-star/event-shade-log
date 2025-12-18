import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface Translations {
  appTitle: string;
  trackDailyHabits: string;
  yearlyTaskTracker: string;
  recordDailyAchievements: string;
  daysRecorded: string;
  progress: string;
  addNewTask: string;
  taskName: string;
  taskNamePlaceholder: string;
  addTask: string;
  deleteTask: string;
  deleteTaskConfirm: string;
  cancel: string;
  delete: string;
  chooseTaskToStart: string;
  clickCellToColor: string;
  trackYourProgress: string;
  recordedDays: string;
  completionRate: string;
  remainingDays: string;
  colorStats: string;
  selectColor: string;
  addColor: string;
  colorName: string;
  save: string;
  eraser: string;
  completed: string;
  notCompleted: string;
  editTask: string;
  taskIcon: string;
  taskImage: string;
  removeImage: string;
}

const translations: Record<Language, Translations> = {
  ar: {
    appTitle: "2026",
    trackDailyHabits: "تتبع عاداتك اليومية",
    yearlyTaskTracker: "متتبع المهام السنوي",
    recordDailyAchievements: "سجّل إنجازاتك اليومية على مدار السنة بتصميم بسيط وجميل",
    daysRecorded: "يوم مسجل",
    progress: "التقدم",
    addNewTask: "إضافة مهمة جديدة",
    taskName: "اسم المهمة",
    taskNamePlaceholder: "مثال: القراءة لمدة ٢٠ دقيقة",
    addTask: "إضافة المهمة",
    deleteTask: "حذف المهمة",
    deleteTaskConfirm: "هل أنت متأكد من حذف هذه المهمة؟ سيتم حذف جميع البيانات المرتبطة بها.",
    cancel: "إلغاء",
    delete: "حذف",
    chooseTaskToStart: "اختر مهمة للبدء في تتبع تقدمك اليومي",
    clickCellToColor: "انقر على أي خلية لتلوينها • يمكنك إضافة ألوان مخصصة لكل مهمة",
    trackYourProgress: "تتبع تقدمك اليومي على مدار السنة",
    recordedDays: "الأيام المسجلة",
    completionRate: "نسبة الإنجاز",
    remainingDays: "الأيام المتبقية",
    colorStats: "إحصائيات الألوان",
    selectColor: "اختر لوناً",
    addColor: "إضافة لون",
    colorName: "اسم اللون",
    save: "حفظ",
    eraser: "ممحاة",
    completed: "أنجزت",
    notCompleted: "لم أنجز",
    editTask: "تعديل المهمة",
    taskIcon: "أيقونة المهمة",
    taskImage: "صورة المهمة",
    removeImage: "إزالة الصورة",
  },
  en: {
    appTitle: "2026",
    trackDailyHabits: "Track your daily habits",
    yearlyTaskTracker: "Yearly Task Tracker",
    recordDailyAchievements: "Record your daily achievements throughout the year with a simple and beautiful design",
    daysRecorded: "days recorded",
    progress: "Progress",
    addNewTask: "Add new task",
    taskName: "Task name",
    taskNamePlaceholder: "Example: Read for 20 minutes",
    addTask: "Add Task",
    deleteTask: "Delete Task",
    deleteTaskConfirm: "Are you sure you want to delete this task? All associated data will be deleted.",
    cancel: "Cancel",
    delete: "Delete",
    chooseTaskToStart: "Choose a task to start tracking your daily progress",
    clickCellToColor: "Click any cell to color it • You can add custom colors for each task",
    trackYourProgress: "Track your daily progress throughout the year",
    recordedDays: "Recorded Days",
    completionRate: "Completion Rate",
    remainingDays: "Remaining Days",
    colorStats: "Color Statistics",
    selectColor: "Select a color",
    addColor: "Add Color",
    colorName: "Color name",
    save: "Save",
    eraser: "Eraser",
    completed: "Completed",
    notCompleted: "Not Completed",
    editTask: "Edit Task",
    taskIcon: "Task Icon",
    taskImage: "Task Image",
    removeImage: "Remove Image",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  title: string;
  setTitle: (title: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_KEY = "task-tracker-language";
const TITLE_KEY = "task-tracker-title";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    return (stored === "en" || stored === "ar") ? stored : "ar";
  });

  const [title, setTitleState] = useState<string>(() => {
    return localStorage.getItem(TITLE_KEY) || "2026";
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    localStorage.setItem(TITLE_KEY, title);
  }, [title]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTitle = (newTitle: string) => {
    setTitleState(newTitle);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], title, setTitle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
