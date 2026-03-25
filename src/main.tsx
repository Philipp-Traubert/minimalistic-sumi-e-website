import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ImpressumPage } from "./components/ImpressumPage.tsx";
import { FreeSessionPage, PaidSessionPage } from "./pages.tsx";
import "./styles/main.css";

const path = window.location.pathname.replace(/\/+$/, '') || '/';

const routeMap: Record<string, ComponentType> = {
  '/': App,
  '/impressum': ImpressumPage,
  '/sitzung': PaidSessionPage,
  '/kostenlos': FreeSessionPage,
};

const Page = routeMap[path] ?? App;

createRoot(document.getElementById("root")!).render(<Page />);
