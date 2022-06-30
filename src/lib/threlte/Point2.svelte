<script lang="ts">
	import { cubicOut } from 'svelte/easing';

	import { tweened } from 'svelte/motion';

	import { get, Writable } from 'svelte/store';

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
	export let options:
		| Partial<{
				circleColor: string;
				lineColor: string;
				lineLength: number;
				duration: number;
		  }>
		| undefined;
	let particles = 1 * 1000;
	let positions = [];
	let colors = [];
	let color = new Color();
	let geometry = new BufferGeometry();

	let n = 70,
		n2 = n / 2; // particles spread in the cube

	$: duration = options?.duration ?? 8000;
	let tweeneded: Array<{ x: Writable<number>; y: Writable<number> }> = [];

	$: {
		for (let i = 0; i < positions.length; i += 3) {
			const x = positions[i];
			const y = positions[i + 2];
			const p = Math.round(i / 3);
			if (tweeneded[p] === undefined) {
				tweeneded.push({
					x: tweened(x, { duration, easing: cubicOut }),
					y: tweened(y, { duration, easing: cubicOut })
				});
			} else {
				const x2 = tweeneded[p].x;
				const y2 = tweeneded[p].y;

				x2.set(x, { duration });
				y2.set(y, { duration });
			}
		}
		tweeneded = tweeneded;
	}

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

			//color.setRGB(vx, vy, vz);
			//color.setRGB(1, 1, 1);

			colors.push(color.r, color.g, color.b);
		}
	}, 1000);
	const sprite = new TextureLoader().load(
		//'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
		//'https://img.freepik.com/free-vector/white-transparent-glass-sphere-glass-ball-shiny-bubble-glossy_1284-42810.jpg'
		//'https://img.freepik.com/free-vector/white-empty-round-smooth-sphere-with-shadow_1053-1152.jpg'
		//'https://w7.pngwing.com/pngs/325/860/png-transparent-sphere-ceramic-aluminium-oxide-ball-kugel-measurement-bearing-sphere-thumbnail.png'

		//'https://www.pngall.com/wp-content/uploads/8/Metal-Ball-PNG-Free-Download.png'
		//'https://cdn-icons-png.flaticon.com/512/287/287221.png'
		//'https://i.dlpng.com/static/png/6444450_preview.png'
		'https://cdn0.iconfinder.com/data/icons/3D-shapes-psd/256/ball-6x6.png'
	);

	setInterval(() => {
		let positions2 = tweeneded.flatMap((t) => [get(t.x), 0, get(t.y)]);
		//console.log(positions2);
		geometry.setAttribute('position', new Float32BufferAttribute(positions2, 3));
		//geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
		geometry.computeBoundingSphere();
	}, 30);

	let material = new PointsMaterial({
		size: 8,
		map: sprite,
		alphaTest: 0.5,
		transparent: true,
		sizeAttenuation: false,
		fog: false,

		color: 'white'
		//vertexColors: VertexColors
	});
	let points = new Points(geometry, material);

	/*
	useFrame(() => {
		posX = Math.sin(Date.now() / 1000);
	});*/
</script>

<Object3DInstance object={points} />
