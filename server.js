const express = require('express');
const axios = require('axios');
const app = express();

const getData = async () => {
	try {
		const { data } = await axios.get('https://jsonkeeper.com/b/N9OS');
		return data;
	} catch (error) {
		console.log(error);
	}
};

const main = async () => {
	const data = await getData();
	// console.log(data);
	const updated_data = data.map((value) => {
		const current_date = new Date(); // getting current data
		const date = new Date(value.createdAt); // getting date from data
		const diff = current_date.getTime() - date.getTime(); // get the difference between current date and date from data

		console.log(date.getTime());
		const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // get the number of days
		// check the differnce between days is prime or not
		const isPrime = (num) => {
			for (let i = 2; i < num; i++) {
				if (num % i === 0) {
					return false;
				}
			}
			return num > 1;
		};
		// check the differnce between days is prime or not
		if (isPrime(days)) {
			value.diff_days = days;
			value.isPrime = true;
		} else {
			value.diff_days = days;
			value.isPrime = false;
		}
		return value;
	});

	// console.log(updated_data);
	return updated_data;
	// process.exit();
};

app.get('/', async (req, res) => {
	const result = await main();
	res.send(result);
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
