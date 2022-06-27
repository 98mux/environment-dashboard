<script>
	//import TrafficSounds from '../trafficJam.mp3';
	import TrafficSounds from '../traffic.wav';
	import nature from '../nature.mp3';

	let mixingRatio = 1.0;

	let player1 = undefined;
	let player2 = undefined;

	$: {
		if (player1 && player2) {
			if (!player1.paused) {
				player1.play();
			}
			if (!player2.paused) {
				player2.play();
			}
			let ratio1 = mixingRatio;
			let ratio2 = 1 - mixingRatio;
			player1.volume = ratio1;
			player2.volume = ratio2;
		}
	}
</script>

<input type="range" class="range" bind:value={mixingRatio} min={0.0} max={1.0} step={0.01} />
<audio bind:this={player1} src={TrafficSounds} controls>
	<track kind="captions" />
</audio>

<audio bind:this={player2} src={nature} controls>
	<track kind="captions" />
</audio>
