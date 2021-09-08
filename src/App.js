import { ApolloProvider } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import appSyncConfig from "./aws-exports";
import FormComponent from './components/FormComponent';
import ChartComponent from './components/ChartComponent';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth = {
  type: appSyncConfig.aws_appsync_authenticationType,
  apiKey: appSyncConfig.aws_appsync_apiKey,
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth })
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={styles.appContainer}>
        <FormComponent />
        <ChartComponent />
      </div>
    </ApolloProvider>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: window.matchMedia(`(min-width: 400px)`).matches ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: '150px'
  }
}

export default App;
