import { gsap } from "gsap";

const form = document.querySelector('.js-form');
const submitBtn = document.querySelector('.js-form-submit');
const thanksContainer = document.querySelector('.js-form-thanks');

const nameSelector = document.getElementById('name');
const emailSelector = document.getElementById('email');
const messageSelector = document.getElementById('message');

const key = 'cGtNNE11dExxWk1OUHlhanpQVmZ4S3k0YktHUnEzMUM=';

const formValid = () => {
	let valid = true;

	const formFields = [nameSelector, emailSelector, messageSelector];
	let invalidArr = [];

	for(let i = 0; i < formFields.length; i++) {
		if(formFields[i].value == null || formFields[i].value == "") {
			formFields[i].classList.add('is-invalid');
			invalidArr.push(formFields[i]);
			valid = false;
		} else if(formFields[i].id === 'email' && !validateEmail()) {
			invalidArr.push(formFields[i]);
			valid = false;
		} else if(formFields[i].value !== "" && formFields[i].classList.contains('is-invalid')) {
			formFields[i].classList.remove('is-invalid');
		}
	}

	if(invalidArr.length > 0) {
		invalidArr[0].focus();
		gsap.to(invalidArr[0], 0.1, { 
			y: -2,
			ease: 'bounce',
			repeat: 3,
			yoyo: true
		});
	}

	return (valid);
}

function validateEmail() {
	const emailVal = emailSelector.value;
	let atpos = emailVal.indexOf("@");
	let dotpos = emailVal.lastIndexOf(".");

	if (atpos < 1 || (dotpos - atpos < 2)) {
		return false;
	}

	return (true);
}

const handleFormSend = (e) => {
	e.preventDefault();

	const name = document.getElementById('name').value.trim();
	const email = document.getElementById('email').value.trim();
	const message = document.getElementById('message').value.trim();

	const string = atob(key);

	if (formValid()) {
		var data = {
			name: name,
			email: email,
			message: message
		}
	
		Pageclip.send(string, 'default', data, function (error, response) {
			// console.log('saved?', !!error, '; response:', error || response)
		});

		form.classList.remove('is-invalid');
		gsap.to(form, 0.2, {opacity: 0});

		thanksContainer.insertAdjacentHTML(
			'beforeend',
			`<p class="banner-form__thanks__title">Thanks for reaching out!</p>
			<p class="banner-form__thanks__copy">I love getting messages and I'll be in touch with you shortly. Have a great day ahead!</p>`
		);

		gsap.to(thanksContainer, 0.75, {
			opacity: 1,
			visibility: 'visible',
			delay: 0.5
		});
	} else {
		form.classList.add('is-invalid');
		return;
	}
}

export const initialize = () => {
	// Event handlers
	if (!form) {
		return;
	}

	// setAction();
	submitBtn.addEventListener('click', handleFormSend);
}