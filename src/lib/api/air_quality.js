const baseUrl = 'https://api.nilu.no/aq';

const getCurrentAirQuality = async (station) => {
    // Stations can be found at https://luftkvalitet.miljodirektoratet.no/maalestasjoner/
    // returns an object containing the available components as keys,  e.g. {'PM10': '0', 'PM25': '0'}

    return fetch(`${baseUrl}/utd?stations=${station}`)
        .then(res => res.json())
        .then(data => {return Object.fromEntries(data.map(({component, value}) => ([component, value.toFixed(2)])))})
}

export const getAirQualityInterval = async (station, start, end) =>{
    // start and stop on format: yyyy-mm-dd
    // Station E18 Høvik kirke has to be entered as E18%20Høvik%20kirke
	const url = `${baseUrl}/aq/historical/${start}/${end}/${station}`
    const response = await fetch(url);
	let data = await response.json();
    console.log("FINISH FETCH")
    data = Object.fromEntries(data.map(({component, values}) => ([component, values])));

    console.log("DATA: ", data);
	return data;
}



export default getCurrentAirQuality;