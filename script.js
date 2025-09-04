(function () {
  function isValidUrl(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url);
  }

  function disableButtons(state) {
    var yes = document.getElementById("btn-yes");
    var no = document.getElementById("btn-no");
    yes.disabled = state;
    no.disabled = state;
  }

  function showHint() {
    var hint = document.getElementById("hint");
    hint.hidden = false;
  }

  function showOverlay(state) {
    var overlay = document.getElementById("overlay");
    if (!overlay) return;
    overlay.classList.toggle("visible", !!state);
    overlay.setAttribute("aria-hidden", state ? "false" : "true");
  }

  function goTo(url) {
    if (!isValidUrl(url)) {
      alert("Адрес формы не настроен. Откройте файл config.js и укажите URL.");
      return;
    }
    showHint();
    disableButtons(true);
    showOverlay(true);
    // Небольшая задержка для UX, чтобы пользователь видел отклик
    setTimeout(function () {
      window.location.assign(url);
    }, 120);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var yes = document.getElementById("btn-yes");
    var no = document.getElementById("btn-no");

    var studentUrl = window.CONFIG && window.CONFIG.studentFormUrl;
    var nonStudentUrl = window.CONFIG && window.CONFIG.nonStudentFormUrl;

    yes.addEventListener("click", function () { goTo(studentUrl); });
    no.addEventListener("click", function () { goTo(nonStudentUrl); });
  });
})();


