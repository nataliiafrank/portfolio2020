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
	let offsetH = 1000;
	let skillsHeight = document.querySelector('#skills').clientHeight;
	console.log(skillsHeight);

	// create gsap timeline
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: '#skills',
			pin: true,
			pinSpacing: false,
			start: 'top 50px',
			end: `+=${offsetH}`,
			scrub: true,
			markers: true,
		}
	});

	tl.addLabel('start')
	.to('.js-direction-left', {
		xPercent: 5,
	},)
	.to('.js-direction-right', {
		xPercent: -5,
	}, 'start')
	.to('#projects', {
		scrollTrigger: {
			trigger: '#projects',
			pin: true,
			// pinSpacing: false,
			start: `${-skillsHeight} 50px`,
			end: `+=${offsetH}`,
			markers: true,
		},
	}, 'start');
}

export const initialize = () => {
	if(!skillsParent) {
		return;
	}

	populateSkills();
	asignDirection();
	animateSkills();

	window.addEventListener('resize', animateSkills);
}