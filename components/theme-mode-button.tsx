'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export default function ThemeModeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    'startViewTransition' in document && window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

  // 切换动画
  async function toggleDark({ clientX: x, clientY: y }: { clientX: number; clientY: number }) {
    const isDark = resolvedTheme === 'dark';

    if (!enableTransitions()) {
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    }).ready;

    document.documentElement.animate(
      { clipPath: !isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${!isDark ? 'old' : 'new'}(root)`,
      },
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => toggleDark({ clientX: e.clientX, clientY: e.clientY })}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] ${mounted ? 'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' : ''}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] ${mounted ? 'rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' : 'opacity-0'}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
