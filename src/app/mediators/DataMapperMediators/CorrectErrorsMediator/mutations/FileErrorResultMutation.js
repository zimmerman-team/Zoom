import { commitMutation, graphql } from 'react-relay';

// TODO: move the mutation files to the correct places

const mutation = graphql`
  mutation FileErrorResultMutation($input: FileErrorCorrectionMutationInput!) {
    fileErrorCorrection(input: $input) {
      command
      result
    }
  }
`;

function commit(environment, input, handleCompleted, handleError) {
  const variables = {
    input
  };

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted: (response, errors) => {
      handleCompleted(response, errors);
    },
    onError: error => handleError(error)
  });
}

export default { commit };
