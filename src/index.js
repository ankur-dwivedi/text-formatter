import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./App";
import Formatter from "./Formatter";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <App /> */}
    <Formatter />
  </StrictMode>
);
