<script lang="ts">
	import { trafficDataTimeAndValueBetweenDates, volumeAtDate } from '$lib/api/graphql/traffic';
	import dayjs from 'dayjs';
	import * as Tone from 'tone';

	//import TrafficSounds from '../trafficJam.mp3';
	import TrafficSounds from '../traffic.wav';
	const osc = new Tone.Oscillator(440, 'sine').toDestination();

	let beatsPerMinute = 100;

	const f2 = {};

	$: bpm = (1 / (beatsPerMinute / 60)) * 1000;
	const callback = () => {
		osc.start();
		setTimeout(() => {
			osc.stop();
		}, 40);

		setTimeout(callback, bpm);
	};
	setTimeout(callback, bpm);

	let hour = 1;

	let volume = 0.0;

	let player1 = undefined;
	let player2 = undefined;
	export const sum = (accumulator: number, curr: { value: number; date: string }) =>
		accumulator + curr.value;

	$: {
		const date = dayjs().subtract(1, 'day').subtract(dayjs().get('hour'), 'hour');
		const date1 = date.format();
		const date2 = date.add(hour, 'hour').format();
		trafficDataTimeAndValueBetweenDates('17096V443647', date2, date2).then((data) => {
			//console.log(data);
			//const cars = data.reduce(sum);
			const cars = data[0].value;
			//console.log('CARS: ', cars);
			volume = cars / 2000;
			if (volume > 1.0) {
				volume = 1.0;
			}
			beatsPerMinute = volume * 600;
			if (beatsPerMinute < 20) {
				beatsPerMinute = 20;
			}
			if (!player1.paused) {
				player1.play();
			}
			player1.volume = volume;
		});
	}

	/*
	$: {
		if (player1 && player2) {
			if (!player1.paused) {
				player1.play();
			}
			let ratio1 = hour;
			player1.volume = ratio1;
		}
	}*/
</script>

<input type="range" class="range" bind:value={hour} min={0} max={24} step={1} />{hour}
<audio bind:this={player1} src={TrafficSounds} controls>
	<track kind="captions" />
</audio>
