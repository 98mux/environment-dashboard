<script>
	import StatsAndIcon from './StatsAndIcon.svelte';
	import getAirQuality from '$lib/api/air_quality.js';

	let station = 'E18+Høvik+kirke';
	let airQuality = { PM10: '0', NO2: '0', 'PM2.5': '0' };

	$: getAirQuality(station).then((data) => {
		airQuality = data;
	});

	// Forurensningsklasser fra miljødir https://luftkvalitet.miljodirektoratet.no/artikkel/artikler/helserad_og_forurensningsklasser/
	const qualityLevel = {
		NO2: {
			good: {
				min: 0,
				max: 100
			},
			moderate: {
				min: 100,
				max: 200
			},
			bad: {
				min: 200,
				max: 400
			},
			veryBad: {
				min: 400,
				max: 1000
			}
		},
		'PM2.5': {
			good: {
				min: 0,
				max: 30
			},
			moderate: {
				min: 30,
				max: 50
			},
			bad: {
				min: 50,
				max: 150
			},
			veryBad: {
				min: 150,
				max: 1000
			}
		},
		PM10: {
			good: {
				min: 0,
				max: 60
			},
			moderate: {
				min: 60,
				max: 120
			},
			bad: {
				min: 120,
				max: 400
			},
			veryBad: {
				min: 400,
				max: 1000
			}
		}
	};

	const iconLevel = {
		good: 'fa-smile text-success',
		moderate: 'fa-face-meh text-warning',
		bad: 'fa-face-frown text-error',
		veryBad: 'fa-skull-crossbones text-error'
	};

	function getIcon(sensor) {
		let measurementValue = parseInt(airQuality[sensor]);
		let icon = 'fa-smile text-success';
		for (const [key, value] of Object.entries(qualityLevel[sensor])) {
			if (measurementValue >= value.min && measurementValue < value.max) {
				icon = iconLevel[key];
				break;
			}
		}
		return icon;
	}
</script>

<div class="lg:col-span-4 p-4">
	<select class="select w-full text-center" bind:value={station}>
		<option disabled selected>Velg målestasjon</option>
		<option value="E18+Høvik+kirke">E18 Høvik kirke</option>
		<option value="Bekkestua">Bekkestua</option>
	</select>
</div>
<div class="grid lg:grid-cols-3 w-full gap-4">
	<div class="lg:col-span-1">
		<StatsAndIcon title={'NO2 (ug/m³)'} value={airQuality.NO2} icon={getIcon('NO2')} />
	</div>
	<div class="lg:col-span-1">
		<StatsAndIcon title={'PM2.5 (ug/m³)'} value={airQuality['PM2.5']} icon={getIcon('PM2.5')} />
	</div>
	<div class="lg:col-span-1">
		<StatsAndIcon title={'PM10 (ug/m³)'} value={airQuality.PM10} icon={getIcon('PM10')} />
	</div>
</div>
