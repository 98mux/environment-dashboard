<script lang="ts">
	import { OptionType } from 'dayjs';

	import { Canvas } from 'svelte-canvas';

	import Points, { OptionsType } from './Points.svelte';
	import PointsWithRoute from './PointsWithRoute.svelte';

	let points = [];
	let width, height;

	export let rows = 50;

	let positions: { x: number; y: number; route: Array<{ id: string }> }[] = [];
	const size = 1000;

	function create() {
		let positions2 = [];
		for (let i = 0; i < rows * rows; i++) {
			let random = Math.random();
			let r = positions[i]?.r;
			if (r === undefined) {
				r = 4;
				if (random > 0.7) {
					r = 4;
				}
				if (random > 0.9) {
					r = 8;
				}
			}
			positions2.push({
				x: randomPos(),
				y: randomPos(),
				route: [{ id: 0 }, { id: 1 }, { id: 2 }]
			});
		}
		positions = positions2;
	}
	create();
	function randomPos() {
		return Math.random() * size;
	}
	setInterval(() => {
		create();
	}, 300);

	let canvas = undefined;

	$: third = (rows * rows) / 3;
	type OP = { cars: number; bikes: number; busses: number; background: string };
	type Config = { values: OP; graphic: Array<OptionsType> };

	const config1: Config = {
		values: { cars: 50, bikes: 600, busses: 20, background: 'white' },
		graphic: [{ circleColor: '#64B369' }, { circleColor: '#F3E6DE' }, { circleColor: '#DC3D34' }]
	};

	const config2: Config = {
		values: { cars: 50, bikes: 600, busses: 20, background: 'black' },
		graphic: [
			{ circleColor: 'white', duration: 400 },
			{ circleColor: 'white', duration: 600 },
			{ circleColor: 'white', duration: 200 }
		]
	};

	let options2: Array<OP> = [config1.values, config2.values];
	let options: Array<Array<OptionsType>> = [config1.graphic, config2.graphic];

	let routes = { 0: { x: 50, y: 50 }, 1: { x: 100, y: 100 }, 2: { x: 50, y: 100 } };
	let selected = 0;
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="mx-auto"
	style="width:{size}px; height:{size}px; background:{options2[selected].background}"
>
	<select class="select max-w-xs" bind:value={selected}>
		<option disabled selected>Skins</option>
		<option value={0}>0</option>
		<option value={1}>1</option>
	</select>

	<Canvas {width} {height} style="cursor: pointer" autoclear={true} bind:canvas>
		<PointsWithRoute
			points={positions.slice(0, 1 * third)}
			type="bicycle"
			options={options[selected][0]}
			{routes}
		/>
		<PointsWithRoute
			points={positions.slice(third + 1, 2 * third)}
			type="car"
			options={options[selected][1]}
			{routes}
		/>
		<PointsWithRoute
			points={positions.slice(2 * third + 1, 3 * third)}
			type="bus"
			options={options[selected][2]}
			{routes}
		/>
		<!--{#each positions as { x, z }}
			<Point {x} y={z} fill="tomato" />
		{/each}-->
	</Canvas>
</div>
