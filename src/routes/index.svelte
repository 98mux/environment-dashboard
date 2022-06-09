<script>
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import widgets from '$lib/widgets/index';

	const { item } = gridHelp;
	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	import layout from '$lib/layout.js';

	//$: console.log(items);

	let items = [
		...layout,
		{
			id: id(),
			12: item({ x: 0, y: 3, w: 6, h: 2 }),
			data: {
				type: 'lineChart'
			}
		}
		/*
		{
			id: id(),
			12: item({ x: 0, y: 1, w: 3, h: 2 }),
			data: {
				type: 'statsAndIcon',
				title: 'NO2',
				value: '19.57 ug/m³',
				icon: 'fa-smile text-success'
			}
		},
		{
			id: id(),
			12: item({ x: 2, y: 1, w: 3, h: 2 }),
			data: {
				type: 'statsAndIcon',
				title: 'PM2,5',
				value: '8.50 ug/m³',
				icon: 'fa-smile text-success'
			}
		},
		{
			id: id(),
			12: item({ x: 4, y: 1, w: 3, h: 2 }),
			data: {
				type: 'statsAndIcon',
				title: 'PM10',
				value: '19.20 ug/m³',
				icon: 'fa-smile text-success'
			}
		},
		{
			id: id(),
			12: item({ x: 4, y: 1, w: 3, h: 2 }),
			data: {
				type: 'text',
				text: 'Luftkvalitet og helserisiko denne timen',
				class: 'font-bold text-4xl text-center w-full h-full my-auto'
			}
		},
		{
			id: id(),
			12: item({ x: 4, y: 1, w: 3, h: 2 }),
			data: {
				type: 'statsAndIcon',
				title: 'Sykkelpasseringer',
				value: '219',
				icon: 'fa-person-biking text-success'
			}
		},
		{
			id: id(),
			12: item({ x: 4, y: 1, w: 3, h: 2 }),
			data: {
				type: 'statsAndIcon',
				title: 'Bilpasseringer',
				value: '27 806',
				icon: 'fa-car text-success'
			}
		}*/
	];

	const cols = [
		[1500, 12],
		/*[1024, 3],*/
		/*[500, 1]*/
		[1024, 1]
	];
</script>

<Grid bind:items rowHeight={140} let:item {cols} let:index let:dataItem>
	<span
		on:click={() => {
			console.log(dataItem);
		}}
	>
		{#if widgets[dataItem.data?.type]}
			{#await widgets[dataItem.data?.type]() then component}
				<svelte:component this={component.default} {...dataItem.data} />
			{/await}
		{/if}
	</span>
</Grid>
