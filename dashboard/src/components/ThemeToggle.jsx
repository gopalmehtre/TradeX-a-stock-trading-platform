import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("dashboard-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dashboard-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "var(--text-color)",
        marginLeft: "1rem",
      }}
    >
      {theme === "light" ? (
        <i className="fa fa-moon-o" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-sun-o" aria-hidden="true"></i>
      )}
    </button>
  );
};

export default ThemeToggle;
