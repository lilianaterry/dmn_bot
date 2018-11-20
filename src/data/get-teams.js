const request = require('request-promise');
const _ = require('lodash');
const AWS = require('aws-sdk');

export function addTeamsToDatabase(teams) {
  AWS.config.update({
    region: 'us-east-1',
  });

  const table = 'dmn_teams';
  const docClient = new AWS.DynamoDB.DocumentClient();

  teams.forEach(team => {
    const params = {
      TableName: table,
      Item: {
        team_id: team.teamId,
        team_name: team.teamName,
      },
    };

    docClient.put(params, (err) => {
      if (err) {
        console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
      }
    });
  });
}

export function queryAllTeams() {
  TEAM_PLAYER_API = "http://belo-web1.newsengin.com/dallas/tpweb/web/gateway.php?site=default&tpl=API_ActiveTeams&contentType=json";

  const options = {
    method: 'GET',
    uri: TEAM_PLAYER_API,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true,
  };

  request(options)
    .then(function (response) {
      // get all teams
      const allTeams = _.flatMap(response, function (item) {
        return [{teamId: item.TeamID, teamName: item.TeamName}];
      });

      addTeamsToDatabase(allTeams);
    })
    .catch(function (err) {
      throw new Error('Get team request failed.');
    });
}