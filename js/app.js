import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initialize as menuInitialize } from './menu';
import { initialize as scrollToInitialize } from './scroll-to';
import { initialize as skillsInitialize } from './skills';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const app = () => {
	menuInitialize();
	scrollToInitialize();
	skillsInitialize();
}

window.addEventListener('load', app());