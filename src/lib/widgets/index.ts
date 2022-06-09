const stats = import ('./Stats.svelte');
const statsAndIcon = import ('./StatsAndIcon.svelte');
const stats2 = import ('./Stats2.svelte');
const card = import ('./Card.svelte');
const text = import ('./Text.svelte');
const airQuality = import ('./AirQuality.svelte');
const lineChart = import ('./charts/LineChart.svelte');

const components = {
	"stats": () => stats,
	"stats2": () => stats2,
	"statsAndIcon": () => statsAndIcon,
	"card": () => card,
	"text":()=>text,
	"airQuality":()=>airQuality,
	"lineChart":()=>lineChart
}
export default components;