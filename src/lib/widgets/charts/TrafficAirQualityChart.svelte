<script>
    import { getAirQualityInterval } from "$lib/api/air_quality";
    import { onMount } from "svelte";
    import LineChart from "./LineChart.svelte";

    export let startTime = "";
    export let endTime = "";
    export let aqStation = "";

    let data = undefined;
    let labels = undefined;

    onMount(async () => {
		let aqData = await getAirQualityInterval(aqStation, startTime, endTime);
        labels = aqData.NO2.map(d => d.toTime);

        let NO2Values = aqData.NO2.map(d => d.value);
        let PM25Values = aqData['PM2.5'].map(d => d.value);
        let PM10Values = aqData.PM10.map(d => d.value);
        
        data = {
            labels: labels,
            dataset: [
                {
                    // label: "NO2",
                    values: NO2Values,
                },
                {
                    // label: "PM2.5",
                    values: PM25Values,
                },
                {
                    // label: "PM10",
                    values: PM10Values,
                },
            ]
        };
        console.log(data);
	});
</script>

<div class="stats shadow w-full h-full">
	<LineChart dataset={data} labels={labels}/>
</div>