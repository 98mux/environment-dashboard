<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { derived } from 'svelte/store';
	import { Instance, type Position } from 'threlte';

	export let position: Position;
	let hovering = false;

	let duration = 2000;
	const realX = tweened(position.x, {
		duration,
		easing: cubicOut
	});
	const realY = tweened(position.y, {
		duration,
		easing: cubicOut
	});
	const realZ = tweened(position.z, {
		duration,
		easing: cubicOut
	});

	$: {
		$realX = position.x;
	}
	$: {
		$realZ = position.z;
	}

	const scale = tweened(0.5);
	const colorTween = tweened(255);
	/*$: if (hovering) {
		scale.set(2, {
			duration: 0,
			easing: cubicIn
		});
		colorTween.set(0, {
			duration: 0
		});
	} else {
		scale.set(0.5, {
			duration: 5e3,
			easing: cubicOut
		});
		colorTween.set(255, {
			duration: 5e3
		});
	}
	const color = derived(colorTween, (c) => {
		const r = Math.floor(c);
		const g = Math.floor((c / 255) * 30);
		return `rgb(${r},${g},0)`;
	});*/
</script>

<!--
	scale={$scale}
	color={$color}
	on:pointerenter={() => (hovering = true)}
	on:pointerleave={() => (hovering = false)}-->
<Instance scale={0.7} color={'rgb(255,255,0)'} position={{ x: $realX, y: $scale * 4, z: $realZ }} />
