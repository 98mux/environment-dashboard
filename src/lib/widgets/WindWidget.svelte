<script>
    export let wind_speed = '';
    export let wind_dir = '';
</script>

<div class="stats shadow w-full h-full">
	<div class="stat">
		<div class="stat-title">Wind</div>
        <div class="stat-value">
            <i class="fa-solid text-3xl mx-auto fa-arrow-up" style="transform: rotate({wind_dir-180}deg)"/> {wind_speed} m/s <!--TODO: Check if arrow points in actual wind direction-->
        </div>
	</div>
</div>