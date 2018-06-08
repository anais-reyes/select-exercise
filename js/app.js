$(document).ready(function() {
	createCitiesArray();
	$('#state-select').change(printSelect);
	$('#city-select').change(activateButton);
	$('#add-city').click(addCity);
	$('#sort-name').click(sortName);
	$('#sort-length').click(sortLength);
	createCityList();
});
function sortName() {
	var cities = JSON.parse(localStorage.cities);
	cities = cities.sort();
	setLocalStorage(cities);
	createCityList();
}

function sortLength() {
	var cities = JSON.parse(localStorage.cities);
	cities = cities.sort(function(a, b) {
		return a.length - b.length;
	});
	setLocalStorage(cities);
	createCityList();
}

function activateButton() {
	if ($(this).val() !== 'default') {
		$('#add-city').removeAttr('disabled');
	} else {
		$('#add-city').attr('disabled', 'true');
	}
}

function printSelect() {
	activateSelect();
	if ($(this).val() !== 'default') {
		generateCities($(this).val());
	} else {
		cleanSelect();
		deactivateSelect();
	}
}

function generateCities(selectedState) {
	cleanSelect();
	states[selectedState].forEach((element, index) => {
		$('#city-select').append(
			'<option value="' + states[selectedState][index] + '">' + states[selectedState][index] + '</option>'
		);
	});
}

function cleanSelect() {
	$('#city-select').empty();
	$('#city-select').append('<option value="default">' + 'Selecciona un municipio' + '</option>');
}

function activateSelect() {
	$('#city-select').removeAttr('disabled');
}

function deactivateSelect() {
	$('#city-select').attr('disabled', true);
	$('#add-city').attr('disabled', true);
}

function addCity(event) {
	event.preventDefault();
	var city = $('#city-select')
		.find(':selected')
		.text();
	setCity(city);
}

function createCityList() {
	$('#list').empty();
	var cities = JSON.parse(localStorage.cities);
	cities.map(element => {
		$('#list').append('<p>' + element + '</p>');
	});
}

function createCitiesArray() {
	var array = [];
	setLocalStorage(array);
}

function setCity(city) {
	var cities = JSON.parse(localStorage.cities);
	if (cities.length === 10) {
		cities.shift();
		storageCity(cities, city);
	} else {
		storageCity(cities, city);
	}
}

function setLocalStorage(array) {
	localStorage.setItem('cities', JSON.stringify(array));
}

function storageCity(cities, city) {
	cities.push(city);
	setLocalStorage(cities);
	createCityList();
}

// Array.prototype.getDuplicatedValues = function() {
// 	var i;
//     for (i = 0; i < this.length; i++) {
//         this[i] = this[i].toUpperCase();
//     }
// };
