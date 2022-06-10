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

<div class="flex gap-2 flex-col lg:flex-row ">
	<div class="lg:w-72 w-full " style="background-color:rgb(60,62,62);">
		<img
			class=" p-4 lg:p-8 mx-auto lg:w-60 w-48"
			src="https://www.baerum.kommune.no/UI/logo-light.png"
		/>
		<div class="w-full p-4">
			<select data-choose-theme class="select lg:select-md select-sm w-full">
				<option value="light">Light</option>
				<option value="dark">Dark</option>
				<option value="garden">garden</option>
				<option value="luxury">Luxury</option>
				<option value="dracula">Dracula</option>
			</select>
		</div>
	</div>
	<div class="overflow-y-scroll w-full">
		<slot />
	</div>
</div>

<svelte:head>
	<link href="/fontawesome-free-6.1.1-web/css/all.css" rel="stylesheet" />
</svelte:head>
