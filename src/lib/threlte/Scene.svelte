<script lang="ts">
	import { ColorManagement, sRGBEncoding } from 'three';
	import { AmbientLight, OrthographicCamera, useThrelte } from 'threlte';
import Fornebu from './Fornebu.svelte';
	import PointedRoute from './PointedRoute.svelte';

	const { size, renderer } = useThrelte();
	renderer.antialias = false;
	/*	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;*/
	/*
	renderer.inputEncoding = sRGBEncoding;
	renderer.outputEncoding = sRGBEncoding;*/

	let zoom = $size.width / 100;
	$: zoom = $size.width / 100;
</script>

<OrthographicCamera position={{ x: 0, y: 500, z: 50 }} {zoom} lookAt={{}} />
<AmbientLight color={0xffffff} intensity={100000000} />

{#if false}
<PointedRoute route={[ [1.0, 1.0], [10.0, 10.0], [1.0, 10.0],
		[10.0, 5.0],
		[15, 15],
		[17, 15],
		[10, 15]
	]}
	count={300}
	animationTime={20}
	size={4}
	width={1}
	noTexture={true}
	color="white"
/>

<PointedRoute
	route={[
		[10.0, -13.0],
		[10.0, -3.0],
		[20.0, -3.0],
		[20.0, -13.0],
		[10.0, -13.0],
		[10, -23]
	]}
	count={300}
	animationTime={5}
	size={4}
	width={1}
	noTexture={true}
	color="lightgreen"

/>
{/if}
<Fornebu/>

<!----
<PointedRoute
	route={[
		[20.0, 50.0],
		[-20.0, -20.0]
	]}
/>--> <!--<PointedRoute route={[
		[30.0, 50.0],
		[30.0, -20.0]
	]}
	width={0.8}
	count={200}
	color="green"
	size={6}
/>-->
<!----
<PointedRoute
	route={[
		[31, -20.0],
		[31, 50.0]
	]}
	size={5}
	width={0.8}
	count={500}
	color="blue"
	noTexture={true}
/>

<PointedRoute
	route={[
		[33.0, 50.0],
		[33.0, -20.0]
	]}
	width={0.8}
	count={200}
	color="pink"
/>
<PointedRoute
	route={[
		[34, -20.0],
		[34, 50.0]
	]}
	size={6}
	width={0.8}
	count={50}
//
	-->