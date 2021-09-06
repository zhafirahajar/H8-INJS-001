//-------function luas lingkaran-------
const pi = 3.14;
const luasLingkaran = (jari) => {
	if (typeof jari === "number") {
		console.log(
			`luas lingkaran dengan jari-jari : ${jari}, adalah ${pi * jari * jari}`
		);
	} else {
		console.log("Function hanya menerima angka!");
	}
};

// luasLingkaran(10);

//-------function Nilai KHS-------
const nilaiKHS = (angka) => {
	if (angka >= 80) {
		return "A";
	} else if (angka >= 70 && angka <= 79) {
		return "B";
	} else if (angka >= 60) {
		return "C";
	} else if (angka >= 50) {
		return "D";
	} else {
		return "E";
	}
};

// const nilaiHuruf = nilaiKHS(56);
// console.log(`Nilai anda adalah ${nilaiHuruf}`);

module.exports = { luasLingkaran, nilaiKHS };
