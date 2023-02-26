"use strict";

// Открытие и закрытие меню-бургер.
const menuIcon = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (menuIcon) {
  menuIcon.onclick = function () {
    menuBody.classList.toggle("_active");
    document.body.classList.toggle("_lock");
    menuIcon.classList.toggle("_active");
  };
}

// Прокрутка
const gotoLinks = document.querySelectorAll("*[data-goto]");
if (gotoLinks.length > 0) {
  gotoLinks.forEach(
    (gotoLink) =>
      (gotoLink.onclick = function (event) {
        let gotoLink = event.target.closest("*[data-goto]");

        if (!gotoLink) return;

        if (!gotoLink.dataset.goto) {
          removeOpenedMenuClasses();
          return;
        }

        let scrollTarget = document.querySelector(gotoLink.dataset.goto);

        if (document.body.contains(scrollTarget)) {
          let scrollTargetCoords =
            window.pageYOffset + scrollTarget.getBoundingClientRect().top;

          window.scrollTo({
            top: scrollTargetCoords,
            behavior: "smooth",
          });

          if (menuBody.classList.contains("_active")) {
            removeOpenedMenuClasses();
          }

          event.preventDefault();
        }
      })
  );
}

// Полноэкранная прокрутка
const blockScrollLinks = document.querySelectorAll(".block-scroll");
if (blockScrollLinks.length > 0) {
  blockScrollLinks.forEach(
    (blockScrollLink) =>
      (blockScrollLink.onclick = function (event) {
        const parent = event.target.closest("*[class^='main__']");

        let scrollCoords =
          parent.getBoundingClientRect().bottom + window.pageYOffset;

        window.scrollTo({
          top: scrollCoords,
          behavior: "smooth",
        });

        event.preventDefault();
      })
  );
}

// Закрытие меню при нажатии не на ссылку.
document.addEventListener("click", function (event) {
  let target = event.target;

  let menuBody = target.closest(".menu__body");

  if (!menuBody || target.closest("a")) return;

  removeOpenedMenuClasses();
});

// Убрать классы которые добавляются при открытом меню.
function removeOpenedMenuClasses() {
  menuBody.classList.remove("_active");
  document.body.classList.remove("_lock");
  menuIcon.classList.remove("_active");
}
