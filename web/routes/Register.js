import React from 'react';
import {
	Form,
	Message,
	Container,
	Header,
	Button,
	Input,
} from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import WrappedContent from '../components/WrappedContent';
import { SyncLoader } from 'react-spinners';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: '',
			password: '',
			err: '',
			loading: false
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async onSubmit() {
		const { email, password, phone } = this.state;
		const response = await this.props.mutate({
			variables: { email, password, phone },
		});

		this.setState({ loading: true })

		const { ok, errors } = response.data.register;

		console.log(errors);
		if (ok) {
			this.props.history.push('/');
		} else {
			this.setState({
				err: errors.message,
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value, loading: false });
	}

	render() {
		const { phone, email, password, err, loading } = this.state;

		const errList = [];

		if (err) {
			errList.push(err);
		}

		return (
			<WrappedContent>
				<Container text>
					<Form>
						<Header as='h2'>Register</Header>
						<Form.Field>
							<Input
								name='email'
								onChange={this.onChange}
								placeholder='Email'
								fluid
								value={email}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								name='phone'
								onChange={this.onChange}
								placeholder='Phone Number'
								fluid
								value={phone}
							/>
						</Form.Field>
						<Form.Field>
							<Input
								name='password'
								onChange={this.onChange}
								type='password'
								placeholder='Password'
								fluid
								value={password}
							/>
						</Form.Field>
						<Button disabled={loading} type='button' primary onClick={this.onSubmit}> Submit </Button>
					</Form>
					{errList.length ? (
						<Message
							error
							header='There was some errors with your submission'
							list={errList}
						/>
					) : null}
				</Container>
			</WrappedContent>
		);
	}
}

const registerMutation = gql`
	mutation($email: String!, $phone: String!, $password: String!) {
		register(email: $email, phone: $phone, password: $password) {
			ok
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(registerMutation)(Register);
