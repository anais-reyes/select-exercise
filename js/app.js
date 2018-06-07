$(document).ready(function() {
	$('#state-select').change(printSelect);
});

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
		$('#city-select').append('<option value="">' + states[selectedState][index] + '</option>');
	});
}

function cleanSelect() {
	$('#city-select').empty();
	$('#city-select').append('<option value="">' + 'Selecciona un municipio' + '</option>');
}

function activateSelect() {
	$('#city-select').removeAttr('disabled');
}

function deactivateSelect() {
	$('#city-select').attr('disabled', true);
}
