
export async function trafficQuery(query:string, variables:any){
	return graphql(query,variables, "https://www.vegvesen.no/trafikkdata/api/")
}

export async function graphql(query: string, variables: any, url:string) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			credentials: 'include',
		},
		body: JSON.stringify({ query, variables })
	})
		.then((r) => r.json())
		.then((r) => r.data);
}