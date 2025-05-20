import { initialState } from "@/constant/theme-constant";
import { ThemeProviderState } from "@/types";
import { createContext } from "react";

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
export default ThemeProviderContext;
