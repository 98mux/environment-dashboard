import { gql } from "@apollo/client/core";

export const TRAFFIC=gql`
{
	trafficData(trafficRegistrationPointId: "44656V72812") {
	  volume {
	    byHour(
	      from: "2019-10-24T12:00:00+02:00"
	      to: "2019-10-24T14:00:00+02:00"
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
`;
