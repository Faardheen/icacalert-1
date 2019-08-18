import React from 'react';
import { Header, Message } from 'semantic-ui-react';
import WrappedContent from '../components/WrappedContent';

export default () => (
  <WrappedContent>
    <Header as='h1' textAlign='center' > Changelog </Header>
    <Message>
      <Header as='h1'>Welcome to ICACalert!</Header>
      <p>
        We are on a journey to conceive a platform where people can report instances of corruption plus use these data to produce statistical infographics so that people become aware of the inclination of corruption in Mauritius. Our principal intent for the app is to be used as a reference to observe the specifications and position of notified alerts so that users can get a notion of the corruption trend encompassing them. This will urge stakeholders and organizations to exert actions in order to safeguard their reputation.
      </p>
    </Message>
    <Message>
      <Header as='h1'>Future</Header>
      <p>
        This website is still in progress. However, we will continue to maintain it because we really want to turn this concept into reality! We would really appreciate if you could send us your feedback!
      </p>
    </Message>
  </WrappedContent>
)