import { gql } from 'apollo-server-express';

export default gql`
	type Query {
		dummy: String
	}
	type User {
		id: Int!
		email: String!
		password: String!
		phone: String!
		alerts: [Alert!]!
	}

	type RegisterResponse {
		ok: Boolean!
		user: User
		errors: Error
	}

	type LoginResponse {
		ok: Boolean!
		user: User
		token: String
		refreshToken: String
		errors: Error
	}

	type Mutation {
		register(
			email: String!
			password: String!
			phone: String!
		): RegisterResponse!
		login(email: String!, password: String!): LoginResponse!
	}
`;
