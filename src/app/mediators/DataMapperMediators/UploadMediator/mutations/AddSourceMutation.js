import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation AddSourceMutation($input: FileSourceMutationInput!) {
    fileSource(input: $input) {
      entryId
      name
    }
  }
`;

function commit(environment, name, handleCompleted, handleError) {
  const variables = {
    input: {
      name,
    },
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      handleCompleted(response, errors);
    },
    onError: error => handleError(error),
  });
}

export default { commit };
