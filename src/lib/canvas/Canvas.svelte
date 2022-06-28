<script lang="ts">
	import { Canvas } from 'svelte-canvas';

	import Points from './Points.svelte';

	let points = [];
	let width, height;

	export let rows = 50;

	let positions: { x: number; y: number; r: number }[] = [];
	const size = 1000;

	function create() {
		let positions2 = [];
		for (let i = 0; i < rows * rows; i++) {
			let random = Math.random();
			let r = 2;
			if (random > 0.7) {
				r = 5;
			}
			if (random > 0.9) {
				r = 10;
			}
			positions2.push({
				x: randomPos(),
				y: randomPos(),
				r: positions[i]?.r ? positions[i].r : Math.random() * 3 + 2
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
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	style="width:{size}px; height:{size}px;"
	class="bg-white"
>
	<Canvas {width} {height} style="cursor: pointer" autoclear={true} bind:canvas>
		<Points positions={positions.slice(0, 1 * third)} type="bicycle" />
		<Points positions={positions.slice(third + 1, 2 * third)} type="car" />
		<Points positions={positions.slice(2 * third + 1, 3 * third)} type="bus" />
		<!--{#each positions as { x, z }}
			<Point {x} y={z} fill="tomato" />
		{/each}-->
	</Canvas>
</div>
