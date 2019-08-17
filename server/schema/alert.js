import { gql } from 'apollo-server-express';

export default gql`
	type Alert {
		id: String!
		type: String!
		description: String!
		user: User
		lat: Float
		long: Float
		timeStamp: String
		geo: String
	}

	type Query {
		allAlerts: [Alert]!
		alerts(districtName: String): [Alert!]!
		types(type: String): [Alert!]!
	}

	type AlertResponse {
		ok: Boolean!
		alert: Alert
		errors: Error
	}

	type Mutation {
		createAlert(type: String!, description: String, lat: Float, long: Float, geo: String, userId: String): AlertResponse!
	}
`
