import React from "react";
import { useEffect, useState } from "react";
import { LightIcon, DarkIcon } from "@/components/ui/icons";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (theme === "dark") {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
      } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Switch
      className=""
      onClick={handleChangeTheme}
      defaultSelected={theme === "dark"}
      size="lg"
      color="default"
      thumbIcon={
        theme === "light" ? (
          <DarkIcon fill="#344256" className="w-8" />
        ) : (
          <LightIcon fill="#e1cc47" className="w-8" />
        )
      }
    />
  );
}
