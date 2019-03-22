import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UploadFileMutation($input: FileMutationInput!) {
    file(input: $input) {
      title
      description
      containsSubnationalData
      organisation
      maintainer
      dateOfDataset
      methodology
      defineMethodology
      updateFrequency
      comments
      accessibility
      dataQuality
      numberOfRows
      fileTypes
      location
      source
      entryId
      entryFileHeadingList
      dataModelHeading
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
