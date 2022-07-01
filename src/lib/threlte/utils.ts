import * as turf from '@turf/turf';

export type Point = {x:number, y :number};

export function getCurvedRouteFromRoute(routes: Array<Point>){

	let line = turf.lineString(routes.map((r) => ([r.x,r.y])));
	/*
	let line = turf.lineString([
		[760.91308, 184.27501],
		[766.95556, 187.29501],
		[765.52734, 194.0443],
		[746.1914, 191.34789],
		[736.52343, 200.7657],
		[731.57958, 202.10656]
	]);*/
	let curved = turf.bezierSpline(line, { resolution: 10000, sharpness: 0.85 });

	const cord = curved.geometry.coordinates;
	let curved2 = [];


	//Average out the dots
	let r2 = 10; // 10
	for (let i = 0; i < cord.length; i += r2) {
		if (cord[i + r2] === undefined) {
			break;
		}
		let x = 0;
		let y = 0;
		for (let b = 0; b < r2; b++) {
			x += cord[i + b][0];
			y += cord[i + b][1];
		}
		x /= r2;
		y /= r2;
		curved2.push([x, y]);
	}

	curved2 = curved2.map((([x,y]) => ({x,y})))
	return curved2;
}