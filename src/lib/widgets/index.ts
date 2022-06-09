const stats = import ('./Stats.svelte');
const stats2 = import ('./Stats2.svelte');
const card = import ('./Card.svelte');
const text = import ('./Text.svelte');

const components = {
	"stats": () => stats,
	"stats2": () => stats2,
	"card": () => card,
	"text":()=>text
}
export default components;