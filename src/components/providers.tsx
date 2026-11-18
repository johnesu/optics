"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Check, Heart, Trash2 } from "lucide-react";

type ShopContextValue = {
  favorites: string[];
  compare: string[];
  ready: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  isComparing: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  clearFavorites: () => void;
  clearCompare: () => void;
  notify: (message: string, tone?: "default" | "warn" | "remove") => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const FAV_KEY = "optics:favorites";
const CMP_KEY = "optics:compare";
const COMPARE_LIMIT = 3;

function read(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    tone: "default" | "warn" | "remove";
  } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useRef(0);

  useEffect(() => {
    setFavorites(read(FAV_KEY));
    setCompare(read(CMP_KEY));
    setReady(true);
  }, []);

  const notify = useCallback(
    (message: string, tone: "default" | "warn" | "remove" = "default") => {
      toastId.current += 1;
      setToast({ id: toastId.current, message, tone });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(null), 2600);
    },
    [],
  );

  useEffect(() => {
    if (ready) {
      try {
        window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
      } catch {
        /* ignore quota errors */
      }
    }
  }, [favorites, ready]);

  useEffect(() => {
    if (ready) {
      try {
        window.localStorage.setItem(CMP_KEY, JSON.stringify(compare));
      } catch {
        /* ignore quota errors */
      }
    }
  }, [compare, ready]);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      const exists = favorites.includes(slug);
      setFavorites((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
      notify(exists ? "Removed from saved vehicles" : "Saved to your garage", exists ? "remove" : "default");
    },
    [favorites, notify],
  );

  const isComparing = useCallback(
    (slug: string) => compare.includes(slug),
    [compare],
  );

  const toggleCompare = useCallback(
    (slug: string) => {
      const exists = compare.includes(slug);
      if (!exists && compare.length >= COMPARE_LIMIT) {
        notify("You can compare up to 3 vehicles at a time", "warn");
        return;
      }
      setCompare((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
      notify(
        exists ? "Removed from comparison" : "Added to comparison",
        exists ? "remove" : "default",
      );
    },
    [compare, notify],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    notify("Saved vehicles cleared", "remove");
  }, [notify]);

  const clearCompare = useCallback(() => {
    setCompare([]);
    notify("Comparison cleared", "remove");
  }, [notify]);

  const value = useMemo(
    () => ({
      favorites,
      compare,
      ready,
      isFavorite,
      toggleFavorite,
      isComparing,
      toggleCompare,
      clearFavorites,
      clearCompare,
      notify,
    }),
    [
      favorites,
      compare,
      ready,
      isFavorite,
      toggleFavorite,
      isComparing,
      toggleCompare,
      clearFavorites,
      clearCompare,
      notify,
    ],
  );

  return (
    <MotionConfig reducedMotion="user">
      <ShopContext.Provider value={value}>
        {children}
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4">
          <AnimatePresence>
            {toast ? (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-white shadow-lift ring-1 ring-white/10"
              >
                <span
                  className={
                    toast.tone === "warn"
                      ? "grid size-5 place-items-center rounded-full bg-amber-400/20 text-amber-300"
                      : toast.tone === "remove"
                        ? "grid size-5 place-items-center rounded-full bg-white/10 text-white/70"
                        : "grid size-5 place-items-center rounded-full bg-signal/20 text-signal-2"
                  }
                >
                  {toast.tone === "default" ? (
                    <Heart className="size-3" />
                  ) : toast.tone === "warn" ? (
                    <Check className="size-3" />
                  ) : (
                    <Trash2 className="size-3" />
                  )}
                </span>
                {toast.message}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </ShopContext.Provider>
    </MotionConfig>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
