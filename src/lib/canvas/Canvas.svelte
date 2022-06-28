<script lang="ts">
	import { OptionType } from 'dayjs';

	import { Canvas } from 'svelte-canvas';

	import Points, { OptionsType } from './Points.svelte';

	let points = [];
	let width, height;

	export let rows = 50;

	let positions: { x: number; y: number; r: number }[] = [];
	const size = 1000;

	function create() {
		let positions2 = [];
		for (let i = 0; i < rows * rows; i++) {
			let random = Math.random();
			let r = positions[i]?.r;
			if (r === undefined) {
				r = 4;
				if (random > 0.7) {
					r = 7;
				}
				if (random > 0.9) {
					r = 10;
				}
			}
			positions2.push({
				x: randomPos(),
				y: randomPos(),
				r
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

	let selected = 0;
</script>

<select class="select w-full max-w-xs" bind:value={selected}>
	<option disabled selected>Skins</option>
	<option value={0}>0</option>
	<option value={1}>1</option>
	<option value={2}>2</option>
</select>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	style="width:{size}px; height:{size}px; background:{options2[selected].background}"
>
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
