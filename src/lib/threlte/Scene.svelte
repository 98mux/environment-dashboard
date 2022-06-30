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

	//const geometry = new SphereBufferGeometry(0.5);
	//const geometry = new PlaneGeometry(1, 1).rotateX(180);
	const geometry = new OctahedronBufferGeometry(1, 3);

	const material = new MeshStandardMaterial();
	export let rows = 50;

	const { size } = useThrelte();
	let zoom = $size.width / 100;
	$: zoom = $size.width / 100;
</script>

<OrthographicCamera position={{ x: 0, y: 500, z: -50 }} {zoom} lookAt={{}} />

<InstancedMesh {geometry} {material} interactive position={{ x: 0, z: 0 }} />
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
<Point color={'blue'} />

<!--
<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={5} />-->
