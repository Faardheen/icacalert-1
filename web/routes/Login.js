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

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			err: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async onSubmit() {
		const { email, password } = this.state;
		const response = await this.props.mutate({
			variables: { email, password },
		});

		const { ok, errors, token, refreshToken } = response.data.login;

		console.log(errors);
		if (ok) {
			localStorage.setItem('token', token);
			localStorage.setItem('refreshToken', refreshToken);
			this.props.history.push('/');
			window.location.reload();
		} else {
			this.setState({
				err: errors.message,
			});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { email, password, err } = this.state;

		const errList = [];

		if (err) {
			errList.push(err);
		}

		return (
			<WrappedContent>
				<Container text>
					<Form>
						<Header as='h2'>Login</Header>
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
								name='password'
								onChange={this.onChange}
								type='password'
								placeholder='Password'
								fluid
								value={password}
							/>
						</Form.Field>
						<Button type='button' primary onClick={this.onSubmit}>
							Submit
					</Button>
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

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(loginMutation)(Login);
