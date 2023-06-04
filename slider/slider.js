// Hero section slider
const imageList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let currentImage = 0;
const imageAddress = "slider/slider_img/hero/";
const imageElement = document.getElementById("images");

function getNextImage() {
  if (currentImage == imageList.length - 1) {
    currentImage = 0;
  } else {
    currentImage++;
  }
  imageElement.src = imageAddress + imageList[currentImage];
}

function getPreviousImage() {
  if (currentImage == 0) {
    currentImage = imageList.length - 1;
  } else {
    currentImage--;
  }
  imageElement.src = imageAddress + imageList[currentImage];
}
sliderTimer = setInterval(function () {
  getNextImage();
}, 3000);

const productContainers = [...document.querySelectorAll(".shop-content")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimenstions = item.getBoundingClientRect();
  let containerWidth = containerDimenstions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
