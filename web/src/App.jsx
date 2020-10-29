import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateMeeting from './components/CreateMeeting';
import Meeting from './components/Meeting';
import MeetingSearch from './components/MeetingSearch';

const GRAPHQL_ENDPOINT = 'interaq.hasura.app/v1/graphql';

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `wss://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/meeting/:id" component={Meeting} />
          <Route exact path="/create-meeting" component={CreateMeeting} />
          <Route exact path="/" component={MeetingSearch} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
