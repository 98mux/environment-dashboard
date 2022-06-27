<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	export let x = 0;
	export let y = 0;

	const realX = tweened(x, {
		duration: 400,
		easing: cubicOut
	});
	const realY = tweened(x, {
		duration: 400,
		easing: cubicOut
	});

	$: {
		realX.set(x);
	}
	$: {
		realY.set(y);
	}
</script>

<!--<div class="w-3 h-3 rounded-full absolute bg-red-400" style="left:{$realX}px; top:{$realY}px;" />-->
<div
	class="w-3 h-3 rounded-full absolute bg-red-400 will-change-transform"
	style="transform: translate({$realX}px, {$realY}px);"
/>
