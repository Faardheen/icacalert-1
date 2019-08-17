import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';
import client from './apollo';
import AppLayout from './components/AppLayout';
import styled from 'styled-components';
import decode from 'jwt-decode';
require('./public/index.css');
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import Sidebar from './containers/Sidebar';
import Navbar from './containers/Navbar';
import District from './containers/District';
import { Icon } from 'semantic-ui-react';

let currentUser = {}

try {
	currentUser = decode(localStorage.getItem('token')).user;
} catch (err) {
	console.log(err)
}

const NavbarLayout = styled.div`
	padding-bottom: 0px !important;
	border-bottom: 1px solid #F8F8F8;
`;

const DistrictLayout = styled.div`
	display: grid;
	height: 100vh;
	-webkit-box-shadow: 10px 24px 30px -32px rgba(0,0,0,0.38);
	-moz-box-shadow: 10px 24px 30px -32px rgba(0,0,0,0.38);
	box-shadow: 10px 24px 30px -32px rgba(0,0,0,0.38);
	z-index: 1
`;

const Infographics = styled.div`
	background-color: #F4F7FC;
	display: flex !important;
	overflow-y: auto !important;
	padding-left: 0px !important;
`;

const ContentPage = styled.div`
	padding-top: 0px !important;
`;

const SidebarLayout = styled.div`
	background: linear-gradient(265.44deg, #091630 -2.84%, #163761 89.31%);
	padding-right: 0px !important;
`;

class App extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<AppLayout>
					<div className='ui grid'>
						<SidebarLayout id='sidebar-layout' className='column'>
							<Sidebar />
						</SidebarLayout>
						<div className='fifteen wide column'>
							<AppLayout>
								<div className='ui grid'>
									<NavbarLayout className='row'>
										<div className='column'>
											<Navbar currentUser={currentUser} />
										</div>
									</NavbarLayout>
									<ContentPage className='sixteen wide row column'>
										<DistrictLayout className='three wide column'>
											<District />
										</DistrictLayout>
										<Infographics className='thirteen wide column'>
											<Routes />
										</Infographics>
									</ContentPage>
								</div>
							</AppLayout>

						</div>
					</div>
				</AppLayout>
			</ApolloProvider>
		);
	}
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
