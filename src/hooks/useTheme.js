import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}
