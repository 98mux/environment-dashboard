<script>
	import StatsAndIcon from '$lib/widgets/StatsAndIcon.svelte';
	import Stats from '$lib/widgets/Stats.svelte';
	import getAirQuality from '$lib/api/air_quality.js';
	import LineChart from '$lib/widgets/charts/LineChart.svelte';
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
	<div class="lg:col-span-2">
		<Stats title="Temperatur" value="23.0°C" description="" />
	</div>
	<div class="lg:col-span-2">
		<Stats title="Vind" value="2.70 m/s" description="" />
	</div>
	<div class="lg:col-span-2">
		<Stats title="Nedbør" value="0.00 mm" description="" />
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
		<StatsAndIcon title="NO2 (ug/m³)" value={airQuality?.NO2} icon="fa-smile text-success" />
	</div>

	<div class="lg:col-span-2">
		<StatsAndIcon title="PM2,5 (ug/m³)" value={airQuality['PM2.5']} icon="fa-smile text-success" />
	</div>

	<div class="lg:col-span-2">
		<StatsAndIcon title="PM10 (ug/m³)" value={airQuality?.PM10} icon="fa-smile text-success" />
	</div>
	<div class="lg:col-span-6 h-60">
		<LineChart />
	</div>
</div>
