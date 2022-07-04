<script lang="ts">
	import { Canvas } from 'threlte';
	import Scene from '$lib/threlte/Scene.svelte';
	import map1 from "$lib/cycleMap.png"
	import map2 from "$lib/map.png"
	let path = [];


	function click(event){
		path.push([event.clientX, event.clientY]);
		navigator.clipboard.writeText(JSON.stringify(path));
	}
</script>

<button on:click={() => {path = []}}>Clear</button>
<div class="h-full w-full" style="background-color:#f5f5f5; background-image:url({undefined});" on:click={click}>
	<Canvas frameloop="always">
		<Scene />
	</Canvas>
<!--	<div class="absolute w-full h-full top-0" style="background-image:{map1}" ></div>-->
</div>
