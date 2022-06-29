<script context="module" lang="ts">
	export type OptionsType =
		| Partial<{
				circleColor: string;
				lineColor: string;
				lineLength: number;
				duration: number;
		  }>
		| undefined;
</script>

<script lang="ts">
	import { Layer } from 'svelte-canvas';
	import { spring, tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Writable, get } from 'svelte/store';

	export let positions: Array<{ x: number; y: number; r: number }> = [];
	export let options:
		| Partial<{
				circleColor: string;
				lineColor: string;
				lineLength: number;
				duration: number;
		  }>
		| undefined;
	export let fps = 60;
	export let type: 'car' | 'bicycle' | 'bus';

	let tweeneded: Array<{ x: Writable<number>; y: Writable<number> }> = [];

	let oldValues: Array<Array<{ x: number; y: number }>> = [];

	$: {
		for (let i = 0; i < positions.length; i++) {
			const { x, y } = positions[i];
			if (tweeneded[i] === undefined) {
				tweeneded.push({
					x: tweened(x, { duration, easing: cubicOut }),
					y: tweened(y, { duration, easing: cubicOut })
				});
			} else {
				const x2 = tweeneded[i].x;
				const y2 = tweeneded[i].y;

				x2.set(x, { duration });
				y2.set(y, { duration });
			}
		}
		tweeneded = tweeneded;
	}

	$: duration = options?.duration ?? 14000;
	$: color = options?.circleColor ?? '#FFFFFF';
	$: lineColor = options?.lineColor ?? color;
	$: linePoints = options?.lineLength ?? 30;

	let lineRenderer = undefined;

	let bool = false;

	setInterval(() => {
		bool = !bool;
		if (oldValues.length >= linePoints) {
			oldValues.shift();
		}

		lineRenderer = ({ context }) => {
			context.beginPath();
			for (let n = bool && oldValues.length === linePoints ? 0 : 1; n < oldValues.length; n += 2) {
				for (let i = 0; i < oldValues[n].length; i++) {
					if (oldValues[n][i]) {
						const x2 = oldValues[n][i].x;
						const y2 = oldValues[n][i].y;
						context.moveTo(x2, y2);
						/*if (n + 1 < oldValues.length) {
							const x3 = oldValues[n + 1][i].x;
							const y3 = oldValues[n + 1][i].y;
							context.lineTo(x3, y3);
						}*/
						if (n + 2 < oldValues.length) {
							const x3 = oldValues[n + 1][i].x;
							const y3 = oldValues[n + 1][i].y;
							const x4 = oldValues[n + 2][i].x;
							const y4 = oldValues[n + 2][i].y;
							context.quadraticCurveTo(x3, y3, x4, y4);
							//context.lineTo(x3, y3);
						}
					}
				}
			}

			context.strokeStyle = lineColor;
			context.lineWidth = 1;
			context.closePath();
			//context.strokeWidth = 5;

			context.stroke();
		};

		oldValues.push(tweeneded.map((t) => ({ x: get(t.x), y: get(t.y) })));
	}, 60);

	let render = undefined;
	setInterval(() => {
		render = ({ context }) => {
			context.beginPath();
			context.shadowInset = true;
			context.shadowBlur = 10;
			context.shadowColor = 'gray';
			context.shadowOffsetX = 2;
			context.shadowOffsetY = 2;
			context.fillStyle = color;
			for (let i = 0; i < positions.length; i++) {
				const x = get(tweeneded[i].x);
				const y = get(tweeneded[i].y);
				context.moveTo(x, y);
				context.arc(x, y, positions[i].r * 5, 0, 2 * Math.PI);
			}
			context.fill();
			context.closePath();
		};
	}, 1000 / fps);
</script>

{#if lineRenderer}
	<Layer render={lineRenderer} />
{/if}
{#if render}
	<Layer {render} />
{/if}
