<script>
	import Chart from 'svelte-frappe-charts';

	export let labels = [1,2];
	export let dataset = [{values: [1, 2]}];

	let data = {
		labels: labels,
		dataset: dataset,
	}

	$: console.log("line", data);
</script>

<div class=" w-full h-full card shadow p-2">
	<Chart {data} type="line" />
</div>
