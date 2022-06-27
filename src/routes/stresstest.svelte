<script>
	import Circle from '$lib/Circle.svelte';

	function randomPos() {
		return Math.random() * 800;
	}

	const amountOfCircles = 2000;

	let circles = [];

	for (let i = 0; i < amountOfCircles; i++) {
		circles.push({ x: randomPos(), y: randomPos() });
	}

	setInterval(() => {
		for (let i = 0; i < amountOfCircles; i++) {
			circles[i] = { x: randomPos(), y: randomPos() };
		}
	}, 1000);
</script>

<div style="width:500px; height:500px;">
	{#each circles as { x, y }}
		<Circle {x} {y} />
	{/each}
</div>
