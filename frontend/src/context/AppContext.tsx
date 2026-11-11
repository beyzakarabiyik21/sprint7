import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";
import { AppContext } from "./app-context";
import type { EventInput, User } from "./app-context";

const STORAGE_KEY = "kampus-etkinlikleri";

// Kayıtlı veri varsa onu, yoksa başlangıç verisini kullan
function loadEvents(): CampusEvent[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CampusEvent[];
  } catch {
    // localStorage kullanılamıyorsa varsayılan veriye dön
  }
  return initialEvents;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(loadEvents);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // kaydetme başarısız olsa da uygulama çalışmaya devam eder
    }
  }, [events]);

  function addEvent(data: EventInput) {
    setEvents((list) => [...list, { ...data, id: `event-${Date.now()}` }]);
  }

  function updateEvent(id: string, data: EventInput) {
    setEvents((list) => list.map((e) => (e.id === id ? { ...e, ...data, id } : e)));
  }

  function deleteEvent(id: string) {
    setEvents((list) => list.filter((e) => e.id !== id));
  }

  function login(email: string) {
    setUser({ name: email.split("@")[0], email });
  }

  function register(name: string, email: string) {
    setUser({ name, email });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AppContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent, user, login, register, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}
