const inputs = document.querySelectorAll('input')

const patterns = {
	telephone: /^\d{10}$/,
	username: /^[A-ZА-Я]{1}[a-zа-я]*$/,
	email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})$/
};

function validate(field, regex) {
	if (regex.test(field.value)) {
		field.className = 'valid';
	} else {
		field.className = 'invalid';
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', (e) => {
		//console.log(e.target.attributes.name.value);
		validate(e.target, patterns[e.target.attributes.name.value]);
	})
})

const a = "  One: 'HowOne: 'Hi Mary.' Two: 'Oh, hi.' are you doing?' Two: 'I'm doing alright. How about you?' One: 'Not too bad. The weather is great isn't it?' Two: 'Yes. It's absolutely beautiful today.' One: 'I wish it was like this more frequently.' Two: 'Me too.' One: 'So where are you going now?' Two: 'I'm going to meet a friend of mine at the department store.' One: 'Going to do a little shopping?' Two: 'Yeah, I have to buy some presents for my parents.' One: 'What's the occasion?' Two: 'It's their anniversary.' One: 'That's great. Well, you better get going. You don't want to be late.' Two: 'I'll see you next time.' One: 'Sure. Bye.'"

const newText = a.replace (/[\s]'|'[\s]/gi,'"')
console.log(newText)

