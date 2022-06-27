<script>
	import { Layer } from 'svelte-canvas';
	import { spring, tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let x = 0,
		y = 0,
		r = 2,
		fill = 'black',
		stroke = null,
		strokeWidth = 1;

	/*
	const radius = spring(r, { stiffness: 0.15, damping: 0.3 });
	$: radius.set(r);*/
	let duration = 2000;
	const realX = tweened(x, {
		duration,
		easing: cubicOut
	});
	const realY = tweened(y, {
		duration,
		easing: cubicOut
	});
	/*
	const realZ = tweened(position.z, {
		duration,
		easing: cubicOut
	});*/

	$: {
		$realX = x;
	}
	$: {
		$realY = y;
	}

	$: render = ({ context }) => {
		context.fillStyle = fill;
		context.beginPath();
		context.arc($realX, $realY, /*$radius*/ r, 0, 2 * Math.PI);
		context.fill();

		/*
		if (stroke) {
			context.strokeStyle = stroke;
			context.lineWidth = strokeWidth;
			context.beginPath();
			context.arc(x, y, $radius + strokeWidth / 2, 0, 2 * Math.PI);
			context.stroke();
		}*/
	};
</script>

<Layer {render} />
