import Database from './table-operations';


function generateResult(text) {
  return {
    source: 'pressbotbox.com',
    payload: {
      facebook: {
        text,
      },
    },
  };
}

export function verifySchool(sessionId, schoolName) {
  const validContext = 'team-is-valid';
  const invalidContext = 'team-not-valid';
  let returnContext;

  if (schoolName === 'Klein Oak') {
    returnContext = validContext;
  } else {
    returnContext = invalidContext;
  }

  return {
    outputContexts: [
      {
        name: `projects/pressbot-80cf8/agent/sessions/${sessionId}/contexts/${returnContext}`,
        lifespanCount: 5,
        parameters: {
          param: 'none',
        },
      },
    ],
  };
}

export function addTeamSubscription() {

}
