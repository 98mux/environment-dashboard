<script lang="ts">
	import { Canvas } from 'threlte';
	import Scene from '$lib/threlte/Scene.svelte';
	let mixingRatio = 10;
</script>

<input type="number" class="input" bind:value={mixingRatio} min={100} max={50000} step={100} />
<Canvas>
	<Scene rows={Math.round(Math.sqrt(mixingRatio))} />
</Canvas>
