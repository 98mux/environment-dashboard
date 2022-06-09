<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="flex gap-2 flex-col md:flex-row">
	<div class="md:w-72 w-full md:h-screen" style="background-color:rgb(60,62,62);">
		<img class="p-8 mx-auto md:w-60 w-48" src="https://www.baerum.kommune.no/UI/logo-light.png" />
		<div class="w-full p-4">
			<select data-choose-theme class="select w-full">
				<option value="light">light</option>
				<option value="dark">Dark</option>
				<option value="garden">garden</option>
				<option value="luxury">Luxury</option>
				<option value="dracula">Dracula</option>
			</select>
		</div>
	</div>
	<slot />
</div>

<svelte:head>
	<link href="/fontawesome-free-6.1.1-web/css/all.css" rel="stylesheet" />
</svelte:head>
