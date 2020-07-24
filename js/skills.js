import { skills } from './data';
import { gsap } from 'gsap';

export const skillsParent = document.querySelector('.js-skills');

// utility to shuffle array
const shuffleArray = (arr) => {
	var j, x, i;
	for (i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = arr[i];
		arr[i] = arr[j];
		arr[j] = x;
	}
	return arr;
}

// render randomized skills
const populateSkills = () => {
	const array = skills;

	let skillsCollection = skillsParent.children;
	let skillsRows = [...skillsCollection];

	skillsRows.forEach(function (row) {
		let shuffeledSkillsArr = shuffleArray(array);

		// console.log(shuffeledSkillsArr);
		const shuffeledSkills = shuffeledSkillsArr.join(" ");

		// console.log(shuffeledSkills);
		row.insertAdjacentText('afterbegin', shuffeledSkills);
	});
}

const asignDirection = () => {
	const skillsCollection = skillsParent.children;
	let skillsArr = [...skillsCollection];

	skillsArr.forEach((item, index) => {
		if (index % 2 == 0) {
			item.classList.add('js-direction-left');
		} else {
			item.classList.add('js-direction-right');
		}
	});
}

const animateSkills = () => {
	// create gsap timeline
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: '#skills',
			pin: true,
			start: 'top top',
			end: '+=600',
			scrub: 1,
			markers: true,
		}
	});

	tl.addLabel('start')
	.from('.js-direction-left', {
		x: -400,
	},)
	.to('.js-direction-left', {
		x: 400,
	},)
	.from('.js-direction-right', {
		x: 0
	}, 'start')
	.to('.js-direction-right', {
		x: -800,
	}, 'start');
}

export const initialize = () => {
	if(!skillsParent) {
		return;
	}

	populateSkills();
	asignDirection();
	// animateSkills();
}