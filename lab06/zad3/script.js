async function main(){
	const cities = await fetchCities()
	const cities2050 = JSON.parse(JSON.stringify(cities)); // copy of cities
	const questions = document.querySelectorAll('.question');



	for(let year = 2025; year <= 2050; year++){
		let seventhYear =  (year - 2025 + 1) % 7 === 0;
		for(const city of cities2050){
			
			// pierwszy warunek
			if(city.people > 100000){
				if(city.province.toLowerCase() in ['małopolskie', 'pomorskie', 'mazowieckie', 'dolnośląskie', 'wielkopolskie']){
					city.people = Math.round(city.people * 1.2);
				}else{
					city.people = Math.round(city.people * 1.1);
				}
				
			}

			// trzeci warunek
			else if(city.people > 10000 && city.poeple <= 100000){
				city.people = Math.round(city.people - 650);
			}

			else if(city.people <= 10000 &&
				city.province.toLowerCase() in ['warmińsko-mazurskie', 'świętokrzyskie', 'podlaskie', 'podkarpackie', 'lubuskie'] &&
				seventhYear){
					city.people = Math.round(city.people * 0.95);
			}
			else{
				city.people += Math.floor(Math.random() *(30 + 30 + 1)) - 30;
			}

			//reguła 6
			if((city.people / city.area) > 1000){
				city.area = Math.round(city.area * 1.10);
			}
		}
	}

	// questions
	const q1 = cities2050.reduce((sum, city) => sum + city.people, 0);
	questions[0].innerHTML += `<p>Łączna liczba mieszkańców w 2050 roku: ${q1}</p>`;
	
	// drugie skip an razie
	calculateProvinces(cities2050, questions[1]);

	showSmallCities(cities, cities2050, questions[2]);

	bigCitiesDensity(cities, cities2050, questions[3]);
}
main();

async function fetchCities(){
	const response = await fetch('city.json');

	if(!response.ok){
		throw new Error("Could not fetch cities");
	}

	const data = await response.json();
	return data;
}

function calculateProvinces(cities, question){
	const provinces = {};
	for (const city of cities){
		if(!provinces[city.province]){
			provinces[city.province] = {
				province: city.province,
				people: 0,
				cities: []
			}
		}
		provinces[city.province].people += city.people;
		provinces[city.province].cities.push(city);
	}

	const sortedProvinces = Object.values(provinces).sort((a, b) => b.people - a.people).slice(0, 5);
	console.log(sortedProvinces);

	question.innerHTML += sortedProvinces.map(province => `<p>${province.province}: ${province.people} mieszkańców</p>`).join('');
}

function showSmallCities(cities, cities2050, question){
	cities.sort((a, b) => a.name - b.name);
	cities2050.sort((a, b) => a.name - b.name);
	for(let i = 0; i < cities.length; i++){
		if(cities[i].people < 10000 && cities2050[i].people < cities[i].people){
			question.innerHTML += `<p>${cities[i].name} będzie mieć ${cities[i].people - cities2050[i].people} mieszkańców mniej w 2050 roku</p>`;
		}
	}
}

function bigCitiesDensity(cities, cities2050, question){
	const bigCities = cities.filter(city => city.people > 100000);

    // Obliczamy gęstość dla każdego miasta i sumujemy
    const totalDensity = bigCities.reduce((sum, city) => sum + (city.people / city.area), 0);

    // Obliczamy średnią gęstość
    const averageDensity = totalDensity / bigCities.length;

	const bigCities2050 = cities2050.filter(city => city.people > 100000);
	const totalDensity2050 = bigCities2050.reduce((sum, city) => sum + (city.people / city.area), 0);
	const averageDensity2050 = totalDensity2050 / bigCities2050.length;

	question.innerHTML += `<p>Aktualna średnia gęstość zaludnienia dużych miast: ${averageDensity.toFixed(2)} mieszkańców/km²</p>`;
	question.innerHTML += `<p>Średnia gęstość zaludnienia dużych miast w 2050 roku: ${averageDensity2050.toFixed(2)} mieszkańców/km²</p>`;
}

