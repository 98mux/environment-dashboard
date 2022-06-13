<script>
	import { trafficDataTimeAndValueBetweenDates, volumeAtDate } from '$lib/api/graphql/traffic';
	import dayjs from 'dayjs';
	import StatsAndIcon from '$lib/widgets/StatsAndIcon.svelte';
	import { onMount } from 'svelte';

	const snarøyveien = { car: '17096V443647', bike: '88224B442844' };
	const lysaker = { car: '04925V444232', bike: '55912B613537' };

	let road = snarøyveien;
	let carVolume = 0;
	let bicycleVolume = 0;

	$: {
		volumeAtDate(road.car, dayjs().format()).then((volume) => (carVolume = volume));
		volumeAtDate(road.bike, dayjs().format()).then((volume) => (bicycleVolume = volume));
	}
</script>

<select class="select w-full  m-2 mx-auto text-center" bind:value={road}>
	<option disabled selected>Velg vei</option>
	<option value={snarøyveien}>Snarøyveien (Fornebu)</option>
	<!--<option value={lysaker}>Lysaker</option>-->
</select>
<div class="flex gap-4">
	<StatsAndIcon title="Bilpasseringer" value={carVolume} icon="fa-car text-success" />
	<StatsAndIcon
		title="Sykkelpasseringer"
		value={bicycleVolume}
		icon="fa-person-biking text-success"
	/>
</div>
