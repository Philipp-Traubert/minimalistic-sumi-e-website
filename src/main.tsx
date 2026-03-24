import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ImpressumPage } from "./components/ImpressumPage.tsx";
import "./styles/main.css";

const path = window.location.pathname.replace(/\/+$/, '') || '/';
const Page = path === '/impressum' ? ImpressumPage : App;

createRoot(document.getElementById("root")!).render(<Page />);
