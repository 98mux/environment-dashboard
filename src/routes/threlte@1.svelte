<script lang="ts">
	import { Canvas } from 'threlte';
	import Scene from '$lib/threlte/Scene.svelte';
</script>

<div class="h-full w-full" style="background-color:white;">
	<Canvas frameloop="always">
		<Scene />
	</Canvas>
</div>
