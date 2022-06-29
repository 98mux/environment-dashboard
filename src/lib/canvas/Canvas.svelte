<script lang="ts">
	import { OptionType } from 'dayjs';

	import { Canvas } from 'svelte-canvas';

	import Points, { OptionsType } from './Points.svelte';
	import * as turf from '@turf/turf';

	let points = [];
	let width, height;

	export let rows = 50;

	let positions: { x: number; y: number; r: number }[] = [];
	const size = 1000;

	let routes = [
		[50.0, 50.0],
		[500.0, 500.0],
		[50.0, 500.0],
		[500.0, 50.0],
		[750, 750],
		[474, 857],
		[400, 600],
		[200, 800]
	];
	let line = turf.lineString(routes);
	/*
	let line = turf.lineString([
		[760.91308, 184.27501],
		[766.95556, 187.29501],
		[765.52734, 194.0443],
		[746.1914, 191.34789],
		[736.52343, 200.7657],
		[731.57958, 202.10656]
	]);*/
	let curved = turf.bezierSpline(line, { resolution: 10000, sharpness: 0.85 });

	const cord = curved.geometry.coordinates;
	let curved2 = [];
	let r2 = 10;
	for (let i = 0; i < cord.length; i += r2) {
		if (cord[i + r2] === undefined) {
			break;
		}
		let x = 0;
		let y = 0;
		for (let b = 0; b < r2; b++) {
			x += cord[i + b][0];
			y += cord[i + b][1];
		}
		x /= r2;
		y /= r2;
		curved2.push([x, y]);
	}
	console.log('CURVED:', curved);
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
			if (curved2[i]) {
				const [x, y] = curved2[i];
				positions2.push({ x, y, r: 3 });
			}

			/*
			positions2.push({
				x: randomPos(),
				y: randomPos(),
				r
			});*/
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
		<Points
			positions={positions.slice(0, 1 * third)}
			type="bicycle"
			options={options[selected][0]}
		/>
		<Points
			positions={positions.slice(third + 1, 2 * third)}
			type="car"
			options={options[selected][1]}
		/>
		<Points
			positions={positions.slice(2 * third + 1, 3 * third)}
			type="bus"
			options={options[selected][2]}
		/>
		<!--{#each positions as { x, z }}
			<Point {x} y={z} fill="tomato" />
		{/each}-->
	</Canvas>
</div>
