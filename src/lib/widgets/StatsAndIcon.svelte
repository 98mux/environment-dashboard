<script>
	export let title = '';
	export let value = '';
	export let icon = '';
</script>

<div class="stats shadow w-full h-full">
	<div class="stat text-center my-2">
		<div class="stat-title">{title}</div>
		<div class="stat-value">{value}</div>
		<i class="fa-solid text-7xl mx-auto p- {icon}" />
	</div>
</div>
