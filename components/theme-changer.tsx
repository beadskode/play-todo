"use client";
import { MonitorIcon, MoonStar, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const THEME_ICONS = {
  light: <MonitorIcon />,
  system: <MoonStar />,
  dark: <SunIcon />,
};

const THEMES = ["light", "system", "dark"] as const;

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount || !theme) return <button type="button"></button>;

  type ThemeName = (typeof THEMES)[number];
  const nowThemeIndex = THEMES.indexOf(theme as ThemeName) + 1;
  const changeTheme = () => {
    setTheme(THEMES[nowThemeIndex % THEMES.length]);
  };
  return (
    <Button type="button" onClick={changeTheme} variant={"ghost"}>
      {THEME_ICONS[theme as keyof typeof THEME_ICONS]}
    </Button>
  );
}
