<script lang="ts">
	import { MeshStandardMaterial, SphereBufferGeometry, PlaneGeometry } from 'three';
	import {
		AmbientLight,
		DirectionalLight,
		InstancedMesh,
		OrthographicCamera,
		useThrelte
	} from 'threlte';
	import Sphere from './Sphere.svelte';

	//const geometry = new SphereBufferGeometry(0.5);
	const geometry = new PlaneGeometry(1, 1).rotateX(180);

	const material = new MeshStandardMaterial();
	export let rows = 50;

	let positions: { x: number; z: number }[] = [];

	function create() {
		let positions2 = [];
		for (let i = 0; i < rows * rows; i++) {
			positions2.push({ x: randomPos(), z: randomPos() });
		}
		positions = positions2;
	}
	create();
	function randomPos() {
		return Math.random() * 50;
	}
	setInterval(() => {
		create();
	}, 1000);

	const { size } = useThrelte();
	let zoom = $size.width / 100;
	$: zoom = $size.width / 100;
</script>

<OrthographicCamera position={{ x: 0, y: 500, z: 0 }} {zoom} lookAt={{}} />

<InstancedMesh {geometry} {material} interactive position={{ x: -rows / 2, z: -rows / 2 }}>
	{#each positions as position}
		<Sphere {position} />
	{/each}
</InstancedMesh>

<!--
<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={1} />-->
