export const darkModeHandle = (): void => {
  const toggleDarkModeSwitcher = document.getElementById("toggleDarkMode") as HTMLInputElement;
  const htmlElement = document.documentElement;

  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    htmlElement.classList.add("dark");
    toggleDarkModeSwitcher.checked = true;
  }

  toggleDarkModeSwitcher.addEventListener("input", () => {
    htmlElement.classList.toggle("dark");
    if (htmlElement.classList.contains("dark")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
}
