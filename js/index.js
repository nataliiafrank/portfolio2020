import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initialize as menuInitialize } from './menu';
import { initialize as scrollToInitialize } from './scroll-to';
import { initialize as skillsInitialize } from './skills';
import { initialize as popupInitialize, popups } from './popup';
import { initialize as contactFormInitialize } from './contact-form';
import { initialize as drawSVG } from './draw-svg';
import { initialize as showCV } from './cv';
import { initialize as sceneInit } from './intro';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const app = () => {
	// sceneInit();
	menuInitialize();
	scrollToInitialize();
	skillsInitialize();
	contactFormInitialize();
	drawSVG();
	showCV();

	popups.forEach((popup) => popupInitialize(popup));
}

window.addEventListener('load', app());