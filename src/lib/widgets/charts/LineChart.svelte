<script>
	// 	Note: Due to REPL limitations, full responsiveness may not work here. Download the example from here or from the website (https://layercake.graphics/example/Line) and run locally to get all features.

	import { LayerCake, Svg, Html } from 'layercake';
	import { timeParse, timeFormat } from 'd3-time-format';
	import { format, precisionFixed } from 'd3-format';

	import Line from './utils/Line.svelte';
	import Area from './utils/Area.svelte';
	import AxisX from './utils/AxisX.svelte';
	import AxisY from './utils/AxisY.svelte';

	import Labels from './utils/GroupLabels.html.svelte';
	import SharedTooltip from './utils/SharedTooltip.html.svelte';

	import data from './utils/points.js';
	import data2 from './utils/fruit.js';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
	const formatTickX = timeFormat('%b. %e');
	const formatTickY = (d) => format(`.${precisionFixed(d)}s`)(d);
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
			<AxisY ticks={4} formatTick={formatTickY} />
			<Line />
			<Area />
		</Svg>
		<!--
		<Html>
			<Labels />
			<SharedTooltip formatTitle={formatTickX} dataset={data} />
		</Html>-->
	</LayerCake>
</div>
