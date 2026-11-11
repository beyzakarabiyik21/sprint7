import { createContext } from "react";
import type { CampusEvent } from "../types/campus-event";

export type EventInput = Omit<CampusEvent, "id">;

export interface User {
  name: string;
  email: string;
}

export interface AppContextValue {
  events: CampusEvent[];
  addEvent: (data: EventInput) => void;
  updateEvent: (id: string, data: EventInput) => void;
  deleteEvent: (id: string) => void;
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
