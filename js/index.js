"use strict";

const menuIcon = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (menuIcon) {
  menuIcon.onclick = function () {
    menuBody.classList.toggle("_active");
    document.body.classList.toggle("_lock");
  };
}
