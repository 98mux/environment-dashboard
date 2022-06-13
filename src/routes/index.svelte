<script>
	import AirQuality from '$lib/widgets/AirQuality.svelte';
	import LineChart from '$lib/widgets/charts/LineChart.svelte';
	import TrafficAirQualityChart from '$lib/widgets/charts/TrafficAirQualityChart.svelte';
	import CurrentWeather from '$lib/widgets/CurrentWeather.svelte';
	import Traffic from '$lib/widgets/Traffic.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 items-center">
	<div class="lg:col-span-6">
		<div class="font-extrabold md:text-5xl text-3xl text-center">Fornebu i dag</div>
	</div>

	<div class="lg:col-span-6">
		<CurrentWeather />
	</div>

	<div class="lg:col-span-6">
		<Traffic />
	</div>

	<div class="lg:col-span-6">
		<AirQuality />
	</div>
	<!-- <div class="lg:col-span-6 h-60">
		<LineChart station="E18%20Høvik%20kirke" startTime="2022-06-01" endTime="2022-06-09" />
	</div> -->
	<div class="lg:col-span-6">
		<TrafficAirQualityChart
			aqStation="E18%20Høvik%20kirke"
			startTime="2022-06-07"
			endTime="2022-06-09"
		/>
	</div>
</div>
