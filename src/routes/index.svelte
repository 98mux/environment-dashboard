<script>
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import widgets from '$lib/widgets/index';

	const { item } = gridHelp;
	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	let items = [
		{
			id: id(),
			5: item({
				x: 0,
				y: 0,
				w: 2,
				h: 2
			}),
			3: item({ x: 0, w: 2, h: 2, y: 0 }),
			1: item({ x: 0, y: 0, w: 1, h: 2 }),
			data: { type: 'stats2' }
		},
		{
			id: id(),
			5: item({
				x: 2,
				y: 0,
				w: 3,
				h: 2
			}),
			3: item({ x: 2, w: 1, h: 2, y: 0 }),
			1: item({ x: 0, y: 2, w: 1, h: 2 }),
			data: { type: 'card' }
		},

		{
			id: id(),
			5: item({
				x: 0,
				y: 2,
				w: 5,
				h: 2
			}),
			3: item({ x: 0, w: 3, h: 2, y: 2 }),
			1: item({ x: 0, y: 4, w: 1, h: 2 }),
			data: {
				type: 'stats',
				title: 'Total Page Views',
				value: '89,400',
				description: '21% more than last month'
			}
		}
	];

	const cols = [
		[1500, 5],
		[1024, 3],
		[500, 1]
	];
</script>

<Grid bind:items rowHeight={140} let:item {cols} let:index let:dataItem>
	{#if widgets[dataItem.data?.type]}
		{#await widgets[dataItem.data?.type]() then component}
			<svelte:component this={component.default} {...dataItem.data} />
		{/await}
	{/if}
</Grid>
