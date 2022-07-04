<script lang="ts">
	import { PointsMaterial, BufferGeometry, Float32BufferAttribute, Points } from 'three';
	import { Object3DInstance, useTexture } from 'threlte';
	export let positions: Array<{ x: number; y: number }> = [];
	export let color = 'white';
	export let size = 8;
	export let noTexture = false;
	let geometry = new BufferGeometry();

	/*
	const sprite = new TextureLoader().load(
		//'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
		//'https://img.freepik.com/free-vector/white-transparent-glass-sphere-glass-ball-shiny-bubble-glossy_1284-42810.jpg'
		//'https://img.freepik.com/free-vector/white-empty-round-smooth-sphere-with-shadow_1053-1152.jpg'
		//'https://w7.pngwing.com/pngs/325/860/png-transparent-sphere-ceramic-aluminium-oxide-ball-kugel-measurement-bearing-sphere-thumbnail.png'

		//'https://www.pngall.com/wp-content/uploads/8/Metal-Ball-PNG-Free-Download.png'
		//'https://cdn-icons-png.flaticon.com/512/287/287221.png'
		//'https://i.dlpng.com/static/png/6444450_preview.png'
	);
	sprite.encoding = sRGBEncoding;*/

	const sprite = useTexture(
		noTexture
			? '/noTextureTexture.png'
			: 'https://cdn0.iconfinder.com/data/icons/3D-shapes-psd/256/ball-6x6.png'
	);

	$: {
		if (positions) {
			const positions2 = positions.flatMap((p) => [p.x, 0, p.y]);
			geometry.setAttribute('position', new Float32BufferAttribute(positions2, 3));
			geometry.computeBoundingSphere();
		}
	}
	let material = new PointsMaterial({
		size, // 8 is favorite
		map: sprite,
		alphaTest: noTexture ? 0.5 : 0.5,
		transparent: false, //May actually effect some things
		sizeAttenuation: false,
		fog: false,
		color: color,
		toneMapped: false
	});
	//material.color.setHex(color);
	material.color.convertSRGBToLinear();
	let points = new Points(geometry, material);
</script>

<Object3DInstance object={points} />
