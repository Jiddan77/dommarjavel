"use client";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-full shadow hover:scale-105 transition"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Mörkt läge" : "☀️ Ljust läge"}
    </button>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class">
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}