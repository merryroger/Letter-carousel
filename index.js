import * as goEffect1 from "./effects/effect_1.js";
import * as goEffect2 from "./effects/effect_2.js";

const setupData1 = {
  container: document.querySelector(".carousel.effect1"),
  carouselElements: document.querySelectorAll(".effect1 .carousel-element"),
  nextLetterStepDelay: 0.2, /* sec */
  letterTransitionDuration: 0.25, /* sec */
  transitionFunction: "ease-in-out"
};

const setupData2 = {
  container: document.querySelector(".carousel.effect2"),
  carouselElements: document.querySelectorAll(".effect2 .carousel-element"),
  nextLetterStepDelay: 0.15, /* sec */
  letterTransitionDuration: 0.25, /* sec */
  transitionFunction: "ease-in-out",
  timeOut: 500 /* ms */
}

goEffect1.default(setupData1);
goEffect2.default(setupData2);
