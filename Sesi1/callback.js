//variable
const nama = "zhafira hajar";

//-------callback-------
const makan = (makanan, minum) => {
	console.log(`Halo ${nama}!, Selamat makan ${makanan} yah!`);
	minum();
};

const reminder = () => {
	console.log("Jangan lupa minum kalau udah selesai!");
};

makan("Steak", reminder);
