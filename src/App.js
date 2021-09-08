import { useState } from 'react';
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
  const [colorTheme, setColorTheme] = useState(false);

  const onColorThemeChange = (value) => {
    setColorTheme(value);
  }

  return (
    <ApolloProvider client={client}>
      <div style={{...styles.appContainer, ...{background: colorTheme ? '#202020' : 'white'}}}>
        <FormComponent handleColorTheme={onColorThemeChange}/>
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
    padding: '0 0 150px 0'
  }
}

export default App;
