import { commitMutation, graphql } from 'react-relay';

// TODO: move the mutation files to the correct places

const mutation = graphql`
  mutation SurveyMutation($input: SurveyDataMutationInput!) {
    surveyData(input: $input) {
      id
      haveYouTestedTool
      whoDidYouTestWith
      consideredSenstive
      staffTrained
      askSensitive
      selectRespondents
      howManyRespondents
      editSheet
      dataCleaningTechniques
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
