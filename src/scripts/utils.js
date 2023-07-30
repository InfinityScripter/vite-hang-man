export const darkModeHandle = () => {
const toggleDarkModeSwitcher = document.getElementById("toggleDarkMode");
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