const getAirQuality = async (station) => {
    // Stations can be found at https://luftkvalitet.miljodirektoratet.no/maalestasjoner/
    // returns an object containing the available components as keys,  e.g. {'PM10': '0', 'PM25': '0'}

    return fetch(`https://api.nilu.no/aq/utd?stations=${station}`)
        .then(res => res.json())
        .then(data => {return Object.fromEntries(data.map(({component, value}) => ([component, value.toFixed(2)])))})
}

export default getAirQuality;