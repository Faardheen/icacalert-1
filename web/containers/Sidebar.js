import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const SidebarList = styled.ul`
	list-style: none;
	padding: 0px;
	display: inline-block;
	width: 100%;
	font-size: 18px;
	margin-top: 60px;
`;

const SidebarLinkTitle = styled.p`
	font-size: 8px;
	font-weight: 700;
`;

const SidebarItemBar = styled.li`
	text-align: center;
	color: white;
	font-size: 20px;
	padding: 0px 0px 20px 0px;
`;

const SidebarItem = styled.li`
	text-align: center;
	color: white;
	font-size: 20px;
	padding: 20px 0px;
`;

const SidebarLink = styled.a`
	color: white;
	&:hover {
		color: white;
	}
`;

export default () => (
	<SidebarList>
		<SidebarItem>
			<SidebarLink href='/'><Icon name='home' /></SidebarLink>
			<SidebarLinkTitle>HOME</SidebarLinkTitle>
		</SidebarItem>
		<SidebarItem>
			<SidebarLink href="/alerts"><Icon name='font awesome flag' /></SidebarLink>
			<SidebarLinkTitle>ALERTS</SidebarLinkTitle>
		</SidebarItem>
		<SidebarItem>
			<SidebarLink href="/observe"><Icon name='eye' /></SidebarLink>
			<SidebarLinkTitle>OBSERVE</SidebarLinkTitle>
		</SidebarItem>
	</SidebarList>
);
