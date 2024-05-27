let container = null;
let carouselElements = [];
let pointer = 0;
let lengthLimit = -1;
let endCycle = false;
let nextLetterStepDelay = 0.15; /* sec */
let letterTransitionDuration = 0.25; /* sec */
let timeOut = 0; /* ms */
let transitionFunction = "ease";
const sizes = {
  width: 0,
  height: 0
};


const setUp = (settings) => {
  container = settings.container;
  carouselElements = settings.carouselElements;
  nextLetterStepDelay = (settings.nextLetterStepDelay)
    ? settings.nextLetterStepDelay
    : nextLetterStepDelay;
  letterTransitionDuration = (settings.letterTransitionDuration)
    ? settings.letterTransitionDuration
    : letterTransitionDuration;
  transitionFunction = (settings.transitionFunction)
    ? settings.transitionFunction
    : transitionFunction;
    timeOut = (settings.timeOut < 0) ? 0 : settings.timeOut;
  timeOut += (nextLetterStepDelay + letterTransitionDuration) * 1000;
}

const initCarousel = (settings) => {
  setUp(settings);
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

const endCycleHandler = () => {
  pointer++
  if (pointer >= carouselElements.length) pointer = 0;
  setTimeout(() => fadeElement(carouselElements[pointer]), timeOut);
  lengthLimit = -1;
  endCycle = false;
}

const affectNextLetter = (e) => {
  const index = +e.target.getAttribute("data-index");
  endCycle = index === lengthLimit;
  if (e.target.classList.contains('tofade')) {
    if (index === 0) {
      let nextPointer = pointer + 1;
      if (nextPointer >= carouselElements.length) nextPointer = 0;
      const thisElement = carouselElements[pointer];
      const nextElement = carouselElements[nextPointer];
      lengthLimit = Math.max(thisElement.children.length, nextElement.children.length) - 1;
      raiseElement(nextElement);
      nextElement.classList.remove("hidden");
    }
  }
  if (endCycle) endCycleHandler();
}

const convertElement = (element, transClass) => {
  let delay = 0.0;

  checkElementSize(element);
  const letters = [...element.textContent];
  element.textContent = "";
  letters.forEach((letter, index) => {
    const letterGhost = document.createElement("div");
    letterGhost.setAttribute("data-index", `${index}`);
    letterGhost.className = `letter ${transClass}`;
    letterGhost.innerHTML = letter;
    element.appendChild(letterGhost);
    letterGhost.style.setProperty("transition", `transform ${letterTransitionDuration}s ${transitionFunction} ${delay}s`);
    letterGhost.addEventListener("transitionend", e => affectNextLetter(e));
    delay += nextLetterStepDelay;
  });
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
