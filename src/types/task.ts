export interface Task {
  id: string;
  name: string;
  data: Record<string, string>; // key: "month-day", value: color
}

export interface ColorOption {
  name: string;
  value: string;
  cssVar: string;
}

export const PALETTE_COLORS: ColorOption[] = [
  { name: "أخضر", value: "palette-green", cssVar: "hsl(var(--palette-green))" },
  { name: "أحمر", value: "palette-red", cssVar: "hsl(var(--palette-red))" },
  { name: "أزرق", value: "palette-blue", cssVar: "hsl(var(--palette-blue))" },
  { name: "أصفر", value: "palette-yellow", cssVar: "hsl(var(--palette-yellow))" },
  { name: "بنفسجي", value: "palette-purple", cssVar: "hsl(var(--palette-purple))" },
  { name: "برتقالي", value: "palette-orange", cssVar: "hsl(var(--palette-orange))" },
  { name: "وردي", value: "palette-pink", cssVar: "hsl(var(--palette-pink))" },
  { name: "فيروزي", value: "palette-teal", cssVar: "hsl(var(--palette-teal))" },
];

export const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

export const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
