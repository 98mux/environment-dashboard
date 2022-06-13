<script>
	import Chart from 'svelte-frappe-charts';

	export let labels = ['1', '2'];
	export let datasets = [{ values: ['1', '2'] }];

	let data = {
		labels,
		datasets
	};

	$: console.log('line', data);
</script>

<div class=" w-full h-full card shadow p-2">
	<Chart {data} type="line" />
</div>
