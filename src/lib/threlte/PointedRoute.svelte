<script lang="ts">
	import { useFrame } from 'threlte';
	import Point from './Point.svelte';

	import { cubicOut } from 'svelte/easing';

	import { tweened } from 'svelte/motion';

	import { get, Writable } from 'svelte/store';
	import { getCurvedRouteFromRoute } from './utils';

	export let route: Array<{ x: number; y: number }> = [];
	export let count: number = 500;
	export let options: Partial<{
		color: string;
		size: number;
		duration: string;
	}> = {};
	export let animationTime = 1;

	$: curved = getCurvedRouteFromRoute(route);

	let positions: Array<{ x: number; y: number }> = [];

	let particles: Array<{ offset: { x: number; y: number; t: number } }> = [];

	function rand() {
		return Math.random() * 2 - 1;
	}

	for (let i = 0; i < 1000; i++) {
		particles.push({ offset: { x: rand(), y: rand(), t: Math.random() * 2 - 1 } });
	}

	function getPosition(t: number, offset: { x: number; y: number; t: number }) {
		//t /= 10;
		t *= curved.length;
		t += offset.t * curved.length;

		if (t >= curved.length) {
			t -= curved.length;
		}

		const rounded = Math.round(t);
		const rest = rounded - t;
		const minusOneRest = 1 - rest;

		if (curved[rounded] === undefined || curved[rounded + 1] === undefined) {
			return undefined;
		}

		const r1 = curved[rounded];
		const r2 = curved[rounded + 1];

		const x = r1.x * rest + r2.x * minusOneRest;
		const y = r1.y * rest + r2.y * minusOneRest;
		return { x: x + offset.x, y: y + offset.y };
	}

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() % 10;
		t /= 10;
		//console.log(t);
		positions = particles.map((p) => getPosition(t, p.offset));
		positions = positions.filter((p) => p !== undefined).map((p) => ({ x: p.x * 2.5, y: p.y * 3 }));

		//console.log(t % 1);
	});
</script>

<Point {positions} {...options} />
