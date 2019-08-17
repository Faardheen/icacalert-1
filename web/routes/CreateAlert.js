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
import { Dropdown } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { DEF_1 } from '../../server/constants';
import styled from 'styled-components';

const CorruptionTypeDefinition = styled.p`
	font-size: 20px;
`;

const definitions = [
	{ key: 1, value: 1, definition: DEF_1 },
	{ key: 2, value: 2, definition: "this is the definition of graitific" },
	{ key: 3, value: 3, definition: "this is the definition of public" },
	{ key: 4, value: 4, definition: "this is the definition of public" },
	{ key: 5, value: 5, definition: "this is the definition of public" },
	{ key: 6, value: 6, definition: "this is the definition of public" },
	{ key: 7, value: 7, definition: "this is the definition of public" },
	{ key: 8, value: 8, definition: "this is the definition of public" },
	{ key: 9, value: 9, definition: "this is the definition of public" },
	{ key: 10, value: 10, definition: "this is the definition of public" },
	{ key: 11, value: 11, definition: "this is the definition of public" },
	{ key: 12, value: 12, definition: "this is the definition of public" },
	{ key: 13, value: 13, definition: "this is the definition of public" },
]

const options = [
	{ key: 1, text: "Bribery by public official", value: 1 },
	{ key: 2, text: "Taking gratification to screen offender from punishment", value: 2 },
	{ key: 3, text: "Public official using his office for gratification", value: 3 },
	{ key: 4, text: "Bribery of or by a public official to influence the decision of a public body", value: 4 },
	{ key: 6, text: "Traffic d’influence", value: 5 },
	{ key: 7, text: "Public official taking gratification", value: 6 },
	{ key: 8, text: "Bribery for procuring contracts", value: 7 },
	{ key: 9, text: "Conflict of interests", value: 8 },
	{ key: 10, text: "Treating of public official", value: 9 },
	{ key: 11, text: "Receiving gift for a corrupt purpose", value: 10 },
	{ key: 12, text: "Corruption of agent", value: 11 },
	{ key: 13, text: "Corruption to provoke a serious offence", value: 12 },
];

class CreateAlert extends React.Component {

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				long: position.coords.longitude,
			})
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			value: options[0].value,
			description: '',
			err: '',
			lat: 0,
			long: 0,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	async onSubmit() {
		const { value, description, lat, long } = this.state;
		const currentOption = await options.find(o => o.value === value).text;

		const response = await this.props.mutate({
			variables: { type: currentOption, description, lat, long },
		});

		const { ok, errors } = response.data.createAlert;

		console.log(errors);
		if (ok) {
			this.props.history.push('/');
		} else {
			this.setState({
				err: errors.message,
			});
		}
	}

	handleChange(_e, { value }) {
		this.setState({ value })
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { value, description, err } = this.state;
		const currentOption = options.find(o => o.value === value);
		const currentDefinition = definitions.find(d => d.value === value)
		const errList = [];

		if (err) {
			errList.push(err);
		}

		return (
			<Container text>
				<Form>
					<Header as='h2'>Create Alert</Header>
					<Form.Field>
						<Dropdown
							onChange={this.handleChange}
							options={options}
							placeholder='Type of Corruption'
							selection
							value={value}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							name='description'
							onChange={this.onChange}
							placeholder='Give us some details'
							fluid
							value={description}
						/>
					</Form.Field>
					<Header as='h4'>Selected Type: {currentOption.text}</Header>
					<CorruptionTypeDefinition>{currentDefinition.definition}</CorruptionTypeDefinition>
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
		);
	}
}

const createAlertMutation = gql`
	mutation($type: String!, $description: String, $lat: Float, $long: Float) {
		createAlert(type: $type, description: $description, lat: $lat, long: $long) {
			ok
			alert {
				type
				description
				lat
				long
			}
			errors {
				path
				message
			}	
		}
	}
`;

export default graphql(createAlertMutation)(CreateAlert);
