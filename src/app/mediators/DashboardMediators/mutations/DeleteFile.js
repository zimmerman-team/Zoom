/* eslint-disable */
import graphql from "babel-plugin-relay/macro";
import { commitMutation } from "react-relay";

// So mainly this mutation deletes the indicators/mapped data of the
// dataset

const mutation = graphql`
  mutation DeleteFileMutation($input: FileDeleteMutationInput!) {
    fileDelete(input: $input) {
      id
      message
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
