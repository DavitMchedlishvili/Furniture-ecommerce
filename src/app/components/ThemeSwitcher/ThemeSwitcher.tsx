"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wait until the component is mounted to handle theme rendering.
  if (!mounted) return null;

  return (
    <div>
      <label htmlFor="theme-select" className="sr-only">
        Select Theme
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="focus:outline-none focus:ring-0 focus-visible:no-underline rounded-none border-2 uppercase bg-transparent py-1.5 border-black w-13"
        >
          <option value="system">:desktop:</option>
          <option value="light">:sunny:</option>
          <option value="dark">:crescent_moon:</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
