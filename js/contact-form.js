const form = document.querySelector('.js-form');
const email = process.env.FORM_EMAIL;
const submitBtn = document.querySelector('.js-form-submit');
const thanksContainer = document.querySelector('.js-form-thanks');

const setAction = () => {
	// form.setAttribute('action', '//formspree.io/' + email);
}

const handleFormSend = (e) => {
	e.preventDefault();

	form.classList.add('is-valid');
	thanksContainer.insertAdjacentHTML(
		'afterbegin',
		`<p class="banner-form__thanks__title">Thanks for reaching out!</p>
		<p class="banner-form__thanks__copy">I love getting messages and I'll be in touch with you shortly. Have a great day ahead!</p>`
	);
}

export const initialize = () => {
	// Event handlers
	if(!form) {
		return;
	}

	// setAction();
	submitBtn.addEventListener('click', handleFormSend);
}