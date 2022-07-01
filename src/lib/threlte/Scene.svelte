<script lang="ts">
	import {
		MeshStandardMaterial,
		SphereBufferGeometry,
		PlaneGeometry,
		OctahedronBufferGeometry
	} from 'three';
	import {
		AmbientLight,
		DirectionalLight,
		InstancedMesh,
		OrthographicCamera,
		useThrelte
	} from 'threlte';
	import Point from './Point.svelte';
	import PointedRoute from './PointedRoute.svelte';

	//const geometry = new SphereBufferGeometry(0.5);
	//const geometry = new PlaneGeometry(1, 1).rotateX(180);
	const geometry = new OctahedronBufferGeometry(1, 3);

	const material = new MeshStandardMaterial();
	export let rows = 50;

	const { size } = useThrelte();
	let zoom = $size.width / 100;
	$: zoom = $size.width / 100;

	let route = [
		[1.0, 1.0],
		[10.0, 10.0],
		[1.0, 10.0],
		[10.0, 5.0],
		[15, 15],
		[17, 15],
		[10, 15]
	].map(([x, y]) => ({ x, y }));
	let route2 = [
		[0.0, -13.0],
		[0.0, -3.0],
		[10.0, -3.0],
		[10.0, -13.0],
		[0.0, -13.0],
		[0, -23]
	].map(([x, y]) => ({ x, y }));

	let route3 = [
		[20.0, 50.0],
		[-20.0, -20.0]
	].map(([x, y]) => ({ x, y }));
</script>

<OrthographicCamera position={{ x: 0, y: 500, z: -50 }} {zoom} lookAt={{}} />

<InstancedMesh {geometry} {material} interactive position={{ x: 0, z: 0 }} />
<!--
<Point
	positions={[
		{ x: 5, y: 2 },
		{ x: 0, y: 0 },
		{ x: 2, y: 3 },
		{ x: 20, y: 20 },
		{ x: -20, y: 20 },
		{ x: 20, y: -20 },
		{ x: -20, y: -20 }
	]}
	color={'black'}
/>
<Point color={'white'} />
<Point color={'green'} />
<Point color={'blue'} />-->
<PointedRoute {route} />
<PointedRoute route={route2} />
<PointedRoute route={route3} />

<!--
<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={5} />-->
