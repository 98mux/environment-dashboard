<script>
	// 	Note: Due to REPL limitations, full responsiveness may not work here. Download the example from here or from the website (https://layercake.graphics/example/Line) and run locally to get all features.

	import { LayerCake, Svg } from 'layercake';

	import Line from './utils/Line.svelte';
	import Area from './utils/Area.svelte';
	import AxisX from './utils/AxisX.svelte';
	import AxisY from './utils/AxisY.svelte';

	import data from './utils/points.js';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
</script>

<div class=" w-full h-full card shadow p-2">
	<LayerCake
		padding={{ right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={yKey}
		yDomain={[0, null]}
		{data}
	>
		<Svg>
			<AxisX />
			<AxisY ticks={4} />
			<Line />
			<Area />
		</Svg>
	</LayerCake>
</div>
