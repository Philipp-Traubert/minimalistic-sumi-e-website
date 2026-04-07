import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ImpressumPage } from "./components/ImpressumPage.tsx";
import { KennenlernenPage, PaidSessionPage } from "./pages.tsx";
import "./styles/main.css";

const path = window.location.pathname.replace(/\/+$/, '') || '/';

if (path === '/kostenlos') {
  window.location.replace('/kennenlernen');
}

if (path === '/visitenkarte') {
  window.location.replace('/kennenlernen?utm_source=visitenkarte&utm_medium=qr&utm_campaign=visitenkarte&utm_content=visitenkarte');
}

const flyerMatch = path.match(/^\/f\/(\d{1,4})$/);
if (flyerMatch) {
  const code = flyerMatch[1].padStart(3, '0');
  const target = `/kennenlernen?utm_source=flyer&utm_medium=qr&utm_campaign=flyer&utm_content=${code}`;
  window.location.replace(target);
}

const routeMap: Record<string, ComponentType> = {
  '/': App,
  '/impressum': ImpressumPage,
  '/sitzung': PaidSessionPage,
  '/kennenlernen': KennenlernenPage,
};

const Page = routeMap[path] ?? App;

createRoot(document.getElementById("root")!).render(<Page />);
