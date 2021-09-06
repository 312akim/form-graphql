import './App.css';
import FormComponent from './components/FormComponent';
import { ApolloProvider } from '@apollo/client';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from './aws-exports';

import { listUsers } from './graphql/queries';

const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});

// Test Data
client.query({
  query: gql(listUsers)
}).then(({ data }) => {
  console.log(data.listUsers.items);
});

function App() {
  return (
    <ApolloProvider client={client}>
        <FormComponent />
    </ApolloProvider>
  );
}

export default App;
