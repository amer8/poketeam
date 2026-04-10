(function () {
  try {
    var key = "color-mode";
    var stored = window.localStorage.getItem(key);
    var mode =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    document.documentElement.dataset.colorMode = mode;
  } catch {
    document.documentElement.dataset.colorMode = "light";
  }
})();
