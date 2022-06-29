<script lang="ts">
	import {
		PointsMaterial,
		VertexColors,
		Color,
		BufferGeometry,
		Float32BufferAttribute,
		Points,
		OctahedronBufferGeometry,
		TextureLoader
	} from 'three';
	import { Object3DInstance, useFrame } from 'threlte';

	let posX = 0;
	let particles = 10 * 1000;

	let geometry = new BufferGeometry();
	//const geometry = new OctahedronBufferGeometry(1, 3);

	let positions = [];
	let colors = [];

	let color = new Color();

	let n = 70,
		n2 = n / 2; // particles spread in the cube

	setInterval(() => {
		colors = [];
		positions = [];
		for (let i = 0; i < particles; i++) {
			// positions

			let x = Math.random() * n - n2;
			let y = Math.random() * n - n2;
			//y = 0;
			let z = Math.random() * n - n2;
			//z = 0;

			positions.push(x, y, z);

			// colors

			let vx = x / n + 0.5;
			let vy = y / n + 0.5;
			let vz = z / n + 0.5;
			//let vz = 0;

			color.setRGB(vx, vy, vz);

			colors.push(color.r, color.g, color.b);
		}
	}, 1000);
	/*
	const sprite = new TextureLoader().load(
		'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
	);
	*/
	const sprite = new TextureLoader().load(
		//'https://img.freepik.com/free-vector/white-transparent-glass-sphere-glass-ball-shiny-bubble-glossy_1284-42810.jpg'
		//'https://img.freepik.com/free-vector/white-empty-round-smooth-sphere-with-shadow_1053-1152.jpg'
		//'https://w7.pngwing.com/pngs/325/860/png-transparent-sphere-ceramic-aluminium-oxide-ball-kugel-measurement-bearing-sphere-thumbnail.png'
		'https://cdn0.iconfinder.com/data/icons/3D-shapes-psd/256/ball-6x6.png'
	);

	$: {
		geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
		//geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

		geometry.computeBoundingSphere();
	}

	let material = new PointsMaterial({
		size: 12,
		sizeAttenuation: true,
		map: sprite,
		alphaTest: 0.5,
		transparent: true
		//		vertexColors: VertexColors
	});
	let points = new Points(geometry, material);

	/*
	useFrame(() => {
		posX = Math.sin(Date.now() / 1000);
	});*/
</script>

<Object3DInstance position={{ x: posX }} object={points} />
