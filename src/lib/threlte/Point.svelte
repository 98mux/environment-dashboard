<script lang="ts">
	import { cubicOut } from 'svelte/easing';

	import { tweened } from 'svelte/motion';

	import { get, Writable } from 'svelte/store';

	import {
		PointsMaterial,
		VertexColors,
		BufferGeometry,
		Float32BufferAttribute,
		Points,
		OctahedronBufferGeometry,
		TextureLoader
	} from 'three';
	import { Object3DInstance, useFrame } from 'threlte';
	export let positions: Array<{ x: number; y: number }> = [];
	export let particles = 10 * 1000;
	export let color = 'white';
	export let size = 8;
	let geometry = new BufferGeometry();

	export let duration = 8000;

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

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime() % 1;
		//console.log(t % 1);
		if (positions) {
			const positions2 = positions.flatMap((p) => [p.x + t * 10, 0, p.y + t * 10]);
			geometry.setAttribute('position', new Float32BufferAttribute(positions2, 3));
			//geometry.computeBoundingSphere();
		}
	});
	let material = new PointsMaterial({
		size, // 8 is favorite
		map: sprite,
		alphaTest: 0.5,
		transparent: true,
		sizeAttenuation: false,
		fog: false,
		color: color
	});
	let points = new Points(geometry, material);
</script>

<Object3DInstance object={points} />

<!-- COLORS

			// colors

			let vx = x / n + 0.5;
			let vy = y / n + 0.5;
			let vz = z / n + 0.5;
			//let vz = 0;

			//color.setRGB(vx, vy, vz);
			//color.setRGB(1, 1, 1);

			colors.push(color.r, color.g, color.b);

	/*

		//geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
	useFrame(() => {
		posX = Math.sin(Date.now() / 1000);
	});*/

		//vertexColors: VertexColors

	let colors = [];
	let color = new Color();
-->

<!--	
	SMOOTh
	let tweeneded: Array<{ x: Writable<number>; y: Writable<number> }> = [];

		/*
		let positions2 = tweeneded.flatMap((t, i) => {
			if (i * 3 >= positions.length) {
				return [];
			}
			return [get(t.x), 0, get(t.y)];
		});*/
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
		positions = [];
		for (let i = 0; i < particles; i++) {
			// positions
			let x = Math.random() * n - n2;
			let y = Math.random() * n - n2;
			let z = Math.random() * n - n2;

			positions.push(x, y, z);
		}
	}, 1000);-->
