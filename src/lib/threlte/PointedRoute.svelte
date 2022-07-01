<script lang="ts">
	import { useFrame } from 'threlte';
	import Point from './Point.svelte';

	import { cubicOut } from 'svelte/easing';

	import { tweened } from 'svelte/motion';

	import { get, Writable } from 'svelte/store';
	import { getCurvedRouteFromRoute } from './utils';

	export let route: Array<{ x: number; y: number }> = [];
	export let count: number = 500;
	export let width = 2;
	export let options: Partial<{
		color: string;
		size: number;
		duration: string;
	}> = {};
	export let animationTime = 10;

	$: curved = getCurvedRouteFromRoute(route);

	let positions: Array<{ x: number; y: number }> = [];

	let particles: Array<{ offset: { x: number; y: number; t: number } }> = [];

	function rand() {
		return Math.random() * width - width / 2;
	}

	$: {
		particles = [];
		for (let i = 0; i < count; i++) {
			particles.push({ offset: { x: rand(), y: rand(), t: Math.random() * 1 } });
			//particles.push({ offset: { x: 0, y: 0, t: i / 1000 } });
		}
	}
	function getPosition(t: number, offset: { x: number; y: number; t: number }) {
		//t /= 10;
		t *= curved.length;
		t += offset.t * curved.length;

		if (t >= curved.length) {
			t -= curved.length;
		}

		const rounded = Math.floor(t);
		//const rest = t - rounded;
		const rest = t - rounded;
		const minusOneRest = 1 - rest;

		if (curved[rounded] === undefined || curved[rounded + 1] === undefined) {
			return undefined;
		}

		const r1 = curved[rounded];
		const r2 = curved[rounded + 1];

		const x = r2.x * rest + r1.x * minusOneRest;
		const y = r2.y * rest + r1.y * minusOneRest;
		return { x: x + offset.x, y: y + offset.y };
	}

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() % animationTime;
		t /= animationTime;
		//t = 0;
		//console.log(t);
		positions = particles.map((p) => getPosition(t, p.offset));
		positions = positions.filter((p) => p !== undefined).map((p) => ({ x: p.x, y: p.y }));

		//console.log(t % 1);
	});
</script>

<Point {positions} {...options} />
