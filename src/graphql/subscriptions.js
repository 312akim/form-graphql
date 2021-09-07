/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSurvey = /* GraphQL */ `
  subscription OnCreateSurvey {
    onCreateSurvey {
      id
      stateOption
      modeOption
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSurvey = /* GraphQL */ `
  subscription OnUpdateSurvey {
    onUpdateSurvey {
      id
      stateOption
      modeOption
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSurvey = /* GraphQL */ `
  subscription OnDeleteSurvey {
    onDeleteSurvey {
      id
      stateOption
      modeOption
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      username
      password
      firstName
      surveyResponse {
        id
        stateOption
        modeOption
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      username
      password
      firstName
      surveyResponse {
        id
        stateOption
        modeOption
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      username
      password
      firstName
      surveyResponse {
        id
        stateOption
        modeOption
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
