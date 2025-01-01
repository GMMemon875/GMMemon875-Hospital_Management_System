import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Create a context for managing global state   = take is context wale data ko men globaly use kar sakhon
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to track user data
  const [user, setUser] = useState({});

  return (
    // Provide global state values and functions to all components
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <App />
    </Context.Provider>
  );
};

// Render the root component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
