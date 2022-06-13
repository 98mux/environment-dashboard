<script>
	import { getAirQualityInterval } from '$lib/api/air_quality';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import LineChart from './LineChart.svelte';

	export let startTime = '';
	export let endTime = '';
	export let aqStation = '';

	let datasets = undefined;
	let labels = undefined;

	onMount(async () => {
		let aqData = await getAirQualityInterval(aqStation, startTime, endTime);
		labels = aqData.NO2.map((d) => dayjs(d.toTime).format('ddd HH:mm'));

		let NO2Values = aqData.NO2.map((d) => d.value);
		let PM25Values = aqData['PM2.5'].map((d) => d.value);
		let PM10Values = aqData.PM10.map((d) => d.value);

		datasets = [
			{
				name: 'NO2',
				values: NO2Values
			},
			{
				name: 'PM2.5',
				values: PM25Values
			},
			{
				name: 'PM10',
				values: PM10Values
			}
		];
	});
</script>

<div class="stats shadow w-full h-full">
	{#key datasets}
		<LineChart {datasets} {labels} />
	{/key}
</div>
