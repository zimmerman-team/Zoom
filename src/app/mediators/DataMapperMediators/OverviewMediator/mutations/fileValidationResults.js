import { commitMutation, graphql } from 'react-relay';

// TODO: move the mutation files to the correct places

const mutation = graphql`
  mutation fileValidationResultsMutation(
    $input: FileValidationResultsMutationInput!
  ) {
    fileValidationResults(input: $input) {
      id
      foundList
      missingList
      summary
    }
  }
`;

function commit(environment, id, handleCompleted, handleError) {
  const variables = {
    input: {
      id,
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
