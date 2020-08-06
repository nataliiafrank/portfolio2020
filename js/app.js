import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initialize as menuInitialize } from './menu';
import { initialize as scrollToInitialize } from './scroll-to';
import { initialize as skillsInitialize } from './skills';
import { initialize as popupInitialize, popups } from './popup';
import { initialize as contactFormInitialize } from './contact-form';
import { initialize as drawSVG } from './draw-svg';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const app = () => {
	menuInitialize();
	scrollToInitialize();
	skillsInitialize();
	contactFormInitialize();
	drawSVG();

	popups.forEach((popup) => popupInitialize(popup));
}

window.addEventListener('load', app());