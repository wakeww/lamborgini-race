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

// Читать подробнее...
const readMoreLinks = document.querySelectorAll("[data-show-more]");
if (readMoreLinks.length > 0) {
  readMoreLinks.forEach(
    (readMoreLink) =>
      (readMoreLink.onclick = function (event) {
        let showTarget = event.currentTarget.parentElement.querySelector(
          readMoreLink.dataset.showMore
        );
        if (!showTarget) return;

        let parent = readMoreLink.parentElement;

        parent.querySelector("[class$='dots']").hidden =
          !parent.querySelector("[class$='dots']").hidden;

        showTarget.classList.toggle("_visible");

        if (showTarget.classList.contains("_visible")) {
          event.target.innerHTML = "Скрыть содержимое";
        } else {
          event.target.innerHTML = "читать подробнее...";
        }

        let container = parent.parentElement;
        if (container.querySelector("._visible")) {
          container.classList.add("_no-flex-grow");
        } else {
          container.classList.remove("_no-flex-grow");
        }

        event.preventDefault();
      })
  );
}

// Слайдер
const sliderArrowRight = document.querySelector(".slider-blog__arrow_r");
const sliderArrowLeft = document.querySelector(".slider-blog__arrow_l");

const sliderLine = document.querySelector(".slider-blog__line");

const sliderSlides = document.querySelectorAll(".slider-blog__slide");

let slideWidth;
sliderSlides[0].querySelector("img").onload = function () {
  slideWidth = sliderSlides[0].offsetWidth;
};

let slidesCount = sliderSlides.length;
let columnGap = parseFloat(getComputedStyle(sliderLine).columnGap);

let position = 0;

sliderArrowRight.onclick = function () {
  position = position - slideWidth - columnGap;

  if (position < -(slideWidth * (slidesCount - 2) + columnGap)) {
    position = -(slideWidth * (slidesCount - 2) + columnGap);
  }

  let swipedSlide = sliderSlides[Math.round(-(position / slideWidth)) - 1];

  let visibleText = swipedSlide.querySelector("._visible");

  if (visibleText) {
    visibleText.classList.remove("_visible");
    swipedSlide.querySelector("[data-show-more]").innerHTML =
      "читать подробнее...";
    swipedSlide.querySelector("[class$='dots']").hidden =
      !swipedSlide.querySelector("[class$='dots']").hidden;
  }

  sliderLine.style.left = position + "px";
};

sliderArrowLeft.onclick = function () {
  position = position + slideWidth;

  if (position >= -slideWidth) {
    position = 0;
  }

  let swipedSlide = sliderSlides[Math.round(-(position / slideWidth)) + 2];

  let visibleText = swipedSlide.querySelector("._visible");

  if (visibleText) {
    visibleText.classList.remove("_visible");
    swipedSlide.querySelector("[data-show-more]").innerHTML =
      "читать подробнее...";
    swipedSlide.querySelector("[class$='dots']").hidden =
      !swipedSlide.querySelector("[class$='dots']").hidden;
  }

  sliderLine.style.left = position + "px";
};
