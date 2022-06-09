<script>
	import StatsAndIcon from '$lib/widgets/StatsAndIcon.svelte';
	import Stats from '$lib/widgets/Stats.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4">
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

	<div class="lg:col-span-3">
		<StatsAndIcon title="Bilpasseringer" value="27 806" icon="fa-car text-success" />
	</div>

	<div class="lg:col-span-3">
		<StatsAndIcon title="Sykkelpasseringer" value="219" icon="fa-person-biking text-success" />
	</div>
	<div class="lg:col-span-2">
		<StatsAndIcon title="NO2 (ug/m³)" value="19.57" icon="fa-smile text-success" />
	</div>

	<div class="lg:col-span-2">
		<StatsAndIcon title="PM2,5 (ug/m³)" value="8.50" icon="fa-smile text-success" />
	</div>

	<div class="lg:col-span-2">
		<StatsAndIcon title="PM10 (ug/m³)" value="19.20" icon="fa-smile text-success" />
	</div>
</div>
