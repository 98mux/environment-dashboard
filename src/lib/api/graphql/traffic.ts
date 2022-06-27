import {trafficQuery} from "./graphQL";
import dayjs from "dayjs";


export const sum = (accumulator:number, curr:number) => accumulator + curr;

export const volumeAtDate = (trafficRegistrationPointId:string, date:any):Promise<number> =>
trafficData(trafficRegistrationPointId, dayjs(date).subtract(dayjs(date).get('hours'),'hour').format(),date)
.then((data) => data.trafficData.volume.byHour.edges.map((edge) => edge.node.total.volumeNumbers.volume).reduce(sum));


export const trafficDataTimeAndValueBetweenDates = (trafficRegistrationPointId:string, fromDate:string, toDate:string): Promise<Array<{date:string, value:number}>> =>
trafficData(trafficRegistrationPointId, fromDate, toDate)
.then((data) => data.trafficData.volume.byHour.edges.map((edge) => ({date:edge.node.to, value:parseInt(edge.node.total.volumeNumbers.volume)})));

export const trafficData = (trafficRegistrationPointId:string, from:string, to:string) => trafficQuery(`
	query trafficData($trafficRegistrationPointId: String!, $from:ZonedDateTime!, $to:ZonedDateTime!) {
	trafficData(trafficRegistrationPointId: $trafficRegistrationPointId) {
	  volume {
	    byHour(
	      from: $from,
	      to: $to
	    ) {
	      edges {
		node {
		  from
		  to
		  total {
		    volumeNumbers {
		      volume
		    }
		    coverage {
		      percentage
		    }
		  }
		}
	      }
	    }
	  }
	}
      }
      `,{trafficRegistrationPointId, from, to});
