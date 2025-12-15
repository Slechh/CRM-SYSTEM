import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="215030668246-6p66kbselmaldnc8pcuboumtqcu0muvr.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
