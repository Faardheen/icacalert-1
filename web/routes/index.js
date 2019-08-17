import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateAlert from './CreateAlert';
import AllAlerts from './AllAlerts';
import Observe from './Observe';
import Profile from './Profile';
import DistrictEvent from './DistrictEvent';
import AlertDetail from './AlertDetail';
import { Container } from 'semantic-ui-react';
import Logout from './Logout';
import SortedAlert from './SortedAlert';

export default () => (
	<Container>
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/register' exact component={Register} />
				<Route path='/login' exact component={Login} />
				<Route path='/create-alert' exact component={CreateAlert} />
				<Route path='/register' exact component={Register} />
				<Route path='/alerts' exact component={AllAlerts} />
				<Route path='/observe' exact component={Observe} />
				<Route path='/profile' exact component={Profile} />
				<Route path='/logout' exact component={Logout} />
				<Route path='/:districtName' exact component={DistrictEvent} />
				<Route path='/alert/:districtName' exact component={AlertDetail} />
				<Route path='/alert/:districtName/:type' exact component={SortedAlert} />
			</Switch>
		</BrowserRouter>
	</Container>
);
