import {trafficQuery} from "./graphQL";
import dayjs from "dayjs";


const sum = (accumulator:number, curr:number) => accumulator + curr;

export const volumeAtDate = (trafficRegistrationPointId:string, date:any) => trafficData(trafficRegistrationPointId, date)
.then((data) => data.trafficData.volume.byHour.edges.map((edge) => edge.node.total.volumeNumbers.volume).reduce(sum));

export const trafficData = (trafficRegistrationPointId:string, hour:any) => trafficQuery(`
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
      `,{trafficRegistrationPointId, from:dayjs(hour).subtract(dayjs(hour).get('hours'),'hour').format(), to:hour});
