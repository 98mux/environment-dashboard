<script lang="ts">
	import { Canvas } from 'svelte-canvas';

	import Point from './Point.svelte';

	let points = [];
	let width, height;

	export let rows = 50;

	let positions: { x: number; z: number }[] = [];

	function create() {
		let positions2 = [];
		for (let i = 0; i < rows * rows; i++) {
			positions2.push({ x: randomPos(), z: randomPos() });
		}
		positions = positions2;
	}
	create();
	function randomPos() {
		return Math.random() * 1000;
	}
	setInterval(() => {
		create();
	}, 1000);

	let canvas = undefined;
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<Canvas {width} {height} style="cursor: pointer" autoclear={true} bind:canvas>
		{#each positions as { x, z }}
			<Point {x} y={z} fill="tomato" />
		{/each}
	</Canvas>
</div>

<style>
	div {
		width: 1000px;
		height: 1000px;
	}
</style>
