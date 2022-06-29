<script lang="ts">
	import Canvas2 from '$lib/canvas/Canvas2.svelte';
	let mixingRatio = 1.0;
</script>

<div class="flex flex-col justify-center items-center ">
	<input type="number" class="input" bind:value={mixingRatio} min={0} max={50000} step={100} />
	<Canvas2 rows={Math.sqrt(mixingRatio)} />
</div>
