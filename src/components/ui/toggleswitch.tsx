import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (theme === "dark") {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else if (theme === "light") {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      } else {
        // Para el tema "system", verifica la preferencia del sistema
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        htmlElement.classList.toggle("dark", isDarkMode);
        htmlElement.classList.toggle("light", !isDarkMode);
      }
    }
  }, [theme]);

  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
  };

  return (
    <Select onValueChange={handleThemeChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Tema" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light"> 🌞 Light</SelectItem>
        <SelectItem value="dark"> 🌑 Dark</SelectItem>
        <SelectItem value="system"> 💻 System</SelectItem>
      </SelectContent>
    </Select>
  );
}
