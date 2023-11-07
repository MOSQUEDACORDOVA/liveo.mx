import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import MainProviders from "./containers/main-providers.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MainProviders>
    <App />
  </MainProviders>
);
