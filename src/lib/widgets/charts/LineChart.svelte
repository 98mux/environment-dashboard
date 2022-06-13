<script>
	import Chart from 'svelte-frappe-charts';

	export let labels = ['1', '2'];
	export let datasets = [{ values: ['1', '2'] }];

	let data = {
		labels,
		datasets
	};

	let chart = undefined;
</script>

<div class=" w-full h-full card shadow p-2">
	<Chart
		bind:this={chart}
		{data}
		lineOptions={{ regionFill: 1, hideDots: 1, spline: 1 }}
		axisOptions={{ xIsSeries: true }}
		type="line"
	/>
</div>
