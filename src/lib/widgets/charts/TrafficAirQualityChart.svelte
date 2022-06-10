<script>
    import { getAirQualityInterval } from "$lib/api/air_quality";
    import { onMount } from "svelte";

    onMount(async () => {
        let data = await getAirQualityInterval("E18%20Høvik%20kirke", "2022-06-01", "2022-06-09");
    });
</script>

<div class="stats shadow w-full h-full">
	<div class="stat">
		<div class="stat-title">Traffic Air Quality Chart</div>
	</div>
</div>