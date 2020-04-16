/* eslint-disable */

import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

// TODO: move the mutation files to the correct places

const mutation = graphql`
  mutation FileValidationMutation($input: FileValidationResultsMutationInput!) {
    fileValidationResults(input: $input) {
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
    onError: (error) => handleError(error),
  });
}

export default { commit };
