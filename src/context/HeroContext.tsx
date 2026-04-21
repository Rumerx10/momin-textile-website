import { createContext } from "react";

export const HeroContext = createContext<{
  title: string;
  setTitle: (title: string) => void;
}>({ title: "", setTitle: () => {} });
