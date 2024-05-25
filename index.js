const carouselElements = document.querySelectorAll(".carousel-element");
let pointer = 0;
const transitionFunctions = [
  "ease",
  "ease-in-out",
  "cubic-bezier(0.2, -2, 0.8, 2)",
];

const initCarousel = () => {
  let initStyle = "";
  if (!carouselElements) return;
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
    carouselElements[pointer].classList.add("hidden");
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
  const letters = [...element.textContent];
  element.textContent = "";
  letters.forEach(letter => {
    const letterGhost = document.createElement("div");
    letterGhost.className = `letter ${transClass}`;
    letterGhost.innerHTML = letter;
    element.appendChild(letterGhost);
    letterGhost.style.setProperty("transition", `transform .5s ${transitionFunctions[2]} ${delay}s`);
    delay += .25;
    lastElement = letterGhost;
  });
  lastElement.addEventListener("transitionend", e => affectNextElement(e));
}

initCarousel();
