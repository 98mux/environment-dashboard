<script>
	import StatsAndIcon from '$lib/widgets/StatsAndIcon.svelte';
	import AirQuality from '$lib/widgets/AirQuality.svelte';
	import getAirQuality from '$lib/api/air_quality.js';
	import LineChart from '$lib/widgets/charts/LineChart.svelte';
	import CurrentWeather from '$lib/widgets/CurrentWeather.svelte';
	import Traffic from '$lib/widgets/Traffic.svelte';

	let station = 'E18+Høvik+kirke';
	let airQuality = { PM10: '0', NO2: '0', 'PM2.5': '0' };

	$: getAirQuality(station).then((data) => {
		airQuality = data;
	});
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4 items-center">
	<div class="lg:col-span-6">
		<div class="font-extrabold md:text-5xl text-3xl text-center">Bærum kommune i dag</div>
	</div>
	
	<div class="lg:col-span-6">
		<CurrentWeather />
	</div>

	<div class="lg:col-span-6" />

	<div class="lg:col-span-6 m-2">
		<div class="font-bold text-3xl text-center">Luftkvalitet og helserisiko denne timen</div>
	</div>

	<div class="lg:col-span-6">
		<Traffic />
	</div>

	<div class="lg:col-span-4">
		<select class="select w-full max-w-xs" bind:value={station}>
			<option disabled selected>Velg målestasjon</option>
			<option value="E18+Høvik+kirke">E18 Høvik kirke</option>
			<option value="Bekkestua">Bekkestua</option>
		</select>
	</div>
	<div class="lg:col-span-2">
		<AirQuality title="NO2 (ug/m³)" measurementValue="{airQuality?.NO2}" component='NO2' />
	</div>

	<div class="lg:col-span-2">
		<AirQuality title="PM2,5 (ug/m³)" measurementValue="{airQuality['PM2.5']}" component='PM25' />
	</div>

	<div class="lg:col-span-2">
		<AirQuality title="PM10 (ug/m³)" measurementValue="{airQuality?.PM10}" component='PM10' />
	</div>
	<div class="lg:col-span-6 h-60">
		<LineChart />
	</div>
</div>
