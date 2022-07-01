<script lang="ts">
	import { OrthographicCamera, useThrelte } from 'threlte';
	import PointedRoute from './PointedRoute.svelte';

	const { size, renderer } = useThrelte();
	renderer.gammaOutput = true;
	renderer.gammaFactor = 2.2;

	let zoom = $size.width / 100;
	$: zoom = $size.width / 100;
</script>

<OrthographicCamera position={{ x: 0, y: 500, z: -50 }} {zoom} lookAt={{}} />

<PointedRoute
	route={[
		[1.0, 1.0],
		[10.0, 10.0],
		[1.0, 10.0],
		[10.0, 5.0],
		[15, 15],
		[17, 15],
		[10, 15]
	]}
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
/>
<PointedRoute
	route={[
		[20.0, 50.0],
		[-20.0, -20.0]
	]}
/>
<PointedRoute
	route={[
		[30.0, 50.0],
		[30.0, -20.0]
	]}
	width={0.8}
	count={200}
	color="green"
	size={6}
/>
<PointedRoute
	route={[
		[31, -20.0],
		[31, 50.0]
	]}
	size={4}
	width={0.8}
	count={50}
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
/>
<PointedRoute
	route={[
		[34, -20.0],
		[34, 50.0]
	]}
	size={6}
	width={0.8}
	count={50}
/>
