//array
const buah = ["pisang", "apel", 5, 1, 10];
console.log(
	buah.sort((a, b) => {
		return a - b;
	}),
	buah.find((x) => x > 5)
);
