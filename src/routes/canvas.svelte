<script lang="ts">
	import Canvas from '$lib/canvas/Canvas.svelte';
	let mixingRatio = 1.0;
</script>

<input type="number" class="input" bind:value={mixingRatio} min={0} max={50000} step={100} />
<Canvas rows={Math.sqrt(mixingRatio)} />
