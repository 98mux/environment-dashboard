<script lang="ts">
	import { Canvas } from 'threlte';
	import Scene from '$lib/threlte/Scene.svelte';
	let mixingRatio = 1.0;
</script>

<input type="number" class="input" bind:value={mixingRatio} min={1000} max={50000} step={100} />
<Canvas frameloop="always">
	<Scene rows={Math.round(Math.sqrt(mixingRatio))} />
</Canvas>
