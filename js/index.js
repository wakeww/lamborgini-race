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
          event.target.innerHTML = "скрыть содержимое";
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

// Открыть содержимое
const openLinks = document.querySelectorAll("[data-show-content]");
if (openLinks.length > 0) {
  openLinks.forEach((openLink) => {
    openLink.onclick = function (event) {
      let openTargets = document.querySelectorAll(openLink.dataset.showContent);

      if (openTargets.length > 0) {
        openTargets.forEach((openTarget) => {
          openTarget.classList.add("_visible");
          event.currentTarget.hidden = !event.currentTarget.hidden;
        });
      }
    };
  });
}

// Слайдер
const sliderArrowNext = document.querySelector(".slider-blog__arrow_next");
const sliderArrowPrev = document.querySelector(".slider-blog__arrow_prev");

const sliderLine = document.querySelector(".slider-blog__line");

const sliderSlides = document.querySelectorAll(".slider-blog__slide");

let slideWidth;

let slidesCount = sliderSlides.length;
let columnGap;

let slidesPerView = 2;
let swipedSlide;

let max = -((slideWidth + columnGap) * (slidesCount - slidesPerView));

let position = 0;

sliderArrowNext.onclick = function () {
  columnGap = parseFloat(getComputedStyle(sliderLine).columnGap);
  slideWidth = sliderSlides[0].offsetWidth;

  rollNext();

  swipedSlide = sliderSlides[Math.round(-(position / slideWidth)) - 1];
  let visibleText = swipedSlide.querySelector("._visible");

  removeVisible(swipedSlide, visibleText);

  sliderLine.style.left = position + "px";
};

sliderArrowPrev.onclick = function () {
  columnGap = parseFloat(getComputedStyle(sliderLine).columnGap);
  slideWidth = sliderSlides[0].offsetWidth;

  rollPrev();

  swipedSlide =
    sliderSlides[Math.round(-(position / slideWidth)) + slidesPerView];
  let visibleText = swipedSlide.querySelector("._visible");

  removeVisible(swipedSlide, visibleText);

  sliderLine.style.left = position + "px";
};

// rollNext()
function rollNext() {
  position = position - slideWidth - columnGap;

  if (document.documentElement.clientWidth <= 992) {
    slidesPerView = 1;
  } else {
    slidesPerView = 2;
  }

  max = -((slideWidth + columnGap) * (slidesCount - slidesPerView));

  if (position < max) {
    position = max;
  }
}

// rollPrev()
function rollPrev() {
  position = position + slideWidth + columnGap;

  if (document.documentElement.clientWidth <= 992) {
    slidesPerView = 1;
  } else {
    slidesPerView = 2;
  }

  if (position >= -slideWidth) {
    position = 0;
  }
}

// Убирать текст открытый кнопокой "читать подробнее..." при прокрутке слайда за экран.
function removeVisible(container, visibleText) {
  if (visibleText) {
    visibleText.classList.remove("_visible");
    container.querySelector("[data-show-more]").innerHTML =
      "читать подробнее...";

    let dots = container.querySelector("[class$='dots']");
    dots.hidden = !dots.hidden;

    let noFlexGrow = container.closest("._no-flex-grow");

    if (noFlexGrow && !noFlexGrow.querySelector("._visible")) {
      noFlexGrow.classList.remove("_no-flex-grow");
    }
  }
}

// Возвращать слайдер в начальное положение при смене размера вьюпорта
window.addEventListener("resize", function () {
  position = 0;
  sliderLine.style.left = position + "px";
});

// Карта
// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//     styles: [
//       {
//         featureType: "administrative",
//         elementType: "all",
//         stylers: [
//           {
//             saturation: "-100",
//           },
//         ],
//       },
//       {
//         featureType: "administrative.province",
//         elementType: "all",
//         stylers: [
//           {
//             visibility: "off",
//           },
//         ],
//       },
//       {
//         featureType: "landscape",
//         elementType: "all",
//         stylers: [
//           {
//             saturation: -100,
//           },
//           {
//             lightness: 65,
//           },
//           {
//             visibility: "on",
//           },
//         ],
//       },
//       {
//         featureType: "poi",
//         elementType: "all",
//         stylers: [
//           {
//             saturation: -100,
//           },
//           {
//             lightness: "50",
//           },
//           {
//             visibility: "simplified",
//           },
//         ],
//       },
//       {
//         featureType: "road",
//         elementType: "all",
//         stylers: [
//           {
//             saturation: "-100",
//           },
//         ],
//       },
//       {
//         featureType: "road.highway",
//         elementType: "all",
//         stylers: [
//           {
//             visibility: "simplified",
//           },
//         ],
//       },
//       {
//         featureType: "road.arterial",
//         elementType: "all",
//         stylers: [
//           {
//             lightness: "30",
//           },
//         ],
//       },
//       {
//         featureType: "road.local",
//         elementType: "all",
//         stylers: [
//           {
//             lightness: "40",
//           },
//         ],
//       },
//       {
//         featureType: "transit",
//         elementType: "all",
//         stylers: [
//           {
//             saturation: -100,
//           },
//           {
//             visibility: "simplified",
//           },
//         ],
//       },
//       {
//         featureType: "water",
//         elementType: "geometry",
//         stylers: [
//           {
//             hue: "#ffff00",
//           },
//           {
//             lightness: -25,
//           },
//           {
//             saturation: -97,
//           },
//         ],
//       },
//       {
//         featureType: "water",
//         elementType: "labels",
//         stylers: [
//           {
//             lightness: -25,
//           },
//           {
//             saturation: -100,
//           },
//         ],
//       },
//     ],
//   });
// }

// window.initMap = initMap;
