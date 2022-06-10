<script>
    import Stats from '$lib/widgets/Stats.svelte';
    import { onMount } from 'svelte';
    import WindWidget from './WindWidget.svelte';

    // Coordinates in the middle of Fornebu
    const lat = 59.897158;
    const lon = 10.615183;
    const alt = 5;
    const url = `https://api.met.no/weatherapi/nowcast/2.0/complete?altitude=${alt}&lat=${lat}&lon=${lon}`;

	let temp = 0;
	let wind_speed = 0;
	let wind_dir = 0;
	let percipitation = 0;

	const getWeather = async () => {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

    onMount(async () => {
        let data = await getWeather();
    
        temp = data.properties.timeseries[0].data.instant.details.air_temperature;
        wind_speed = Math.round(data.properties.timeseries[0].data.instant.details.wind_speed);
        wind_dir = parseInt(data.properties.timeseries[0].data.instant.details.wind_from_direction);
        percipitation = data.properties.timeseries[0].data.instant.details.precipitation_rate;
        let last_update = data.properties.timeseries[0].time;
        console.log("Last weather update: " + last_update);
	});
</script>

<div class="grid lg:grid-cols-3 gap-4">
	<div class="lg:col-span-1">
		<Stats title="Temperatur" value="{temp} °C" description="" />
	</div>
	<div class="lg:col-span-1">
        <WindWidget wind_speed="{wind_speed}" wind_dir="{wind_dir}" />
	</div>
	<div class="lg:col-span-1">
		<Stats title="Nedbør" value="{percipitation} mm" description="" />
	</div>
</div>