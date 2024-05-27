const container = document.querySelector(".carousel.effect1");
const carouselElements = document.querySelectorAll(".effect1 .carousel-element");
let pointer = 0;
const nextLetterStepDelay = 0.2; /* sec */
const letterTransitionDuration = 0.25; /* sec */
const sizes = {
  width: 0,
  height: 0
};

const transitionFunctions = [
  "ease",
  "ease-in-out",
  "cubic-bezier(0.2, -2, 0.8, 2)",
];

const initCarousel = () => {
  let initStyle = "";
  if (!container || !carouselElements) return;
  carouselElements.forEach((element, index) => {
    if (element.classList.contains("next-element")) {
      element.classList.add("hidden");
      initStyle = "tofade";
    } else {
      initStyle = "";
      pointer = index;
    }
    convertElement(element, initStyle);
  });
  setContainerSize();
  setTimeout(() => fadeElement(carouselElements[pointer]), 50);
}

const fadeElement = (current) => {
  Array.from(current.children).forEach(element => {
    element.classList.remove("toraise");
    element.classList.add("tofade");
  });
}

const raiseElement = (current) => {
  Array.from(current.children).forEach(element => {
    element.classList.remove("tofade");
    element.classList.add("toraise");
  });
}

const affectNextElement = (e) => {
  if (e.target.classList.contains('tofade')) {
    const previous = carouselElements[pointer];
    previous.classList.add("hidden");

    pointer++;
    if (pointer >= carouselElements.length) pointer = 0;
    const current = carouselElements[pointer];
    raiseElement(current);
    current.classList.remove("hidden");
  } else {
    fadeElement(carouselElements[pointer]);
  }
}

const convertElement = (element, transClass) => {
  let delay = 0.0;
  let lastElement = null;

  checkElementSize(element);
  const letters = [...element.textContent];
  element.textContent = "";
  letters.forEach(letter => {
    const letterGhost = document.createElement("div");
    letterGhost.className = `letter ${transClass}`;
    letterGhost.innerHTML = letter;
    element.appendChild(letterGhost);
    letterGhost.style.setProperty("transition", `transform ${letterTransitionDuration}s ${transitionFunctions[1]} ${delay}s`);
    delay += nextLetterStepDelay;
    lastElement = letterGhost;
  });
  lastElement.addEventListener("transitionend", e => affectNextElement(e));
}

const checkElementSize = (element) => {
  sizes.width = (element.offsetWidth > sizes.width) ? element.offsetWidth : sizes.width;
  sizes.height = (element.offsetHeight > sizes.height) ? element.offsetHeight : sizes.height;
}

const setContainerSize = () => {
  container.style.width = `${sizes.width}px`;
  container.style.height = `${sizes.height}px`;
}

export default initCarousel;
