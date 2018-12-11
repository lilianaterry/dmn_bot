"use strict";

const AWS = require('aws-sdk');

const fs = require('fs');

let cheerio = require('cheerio');

const rp = require('request-promise');

const _ = require('lodash');

const validAreas = ["Highland Park", "Wylie", "Valley View", "Madison", "John Paul II", "Roosevelt"];
AWS.config.update({
  region: 'us-east-1'
});
const docClient = new AWS.DynamoDB.DocumentClient(); // let teams;
// fs.readFile(__dirname + '/result.json', function read(err, data) {
//     if (err) {
//         throw err;
//     } else {
//         teams = JSON.parse(data);
//     }
// });

async function getTeamsFromDatabase() {
  return new Promise((resolve, reject) => {
    var params = {
      TableName: "dmn_teams"
    };
    docClient.scan(params, function (err, data) {
      if (err) reject(err);else resolve(data.Items);
    });
  });
}

const rootURL = "http://www.maxpreps.com";
getTeamsFromDatabase().then(teams => {
  return new Promise((resolve, reject) => {
    let optionsList = [];
    teams.forEach(team => {
      const options = {
        team: team,
        requestParam: {
          uri: `http://www.maxpreps.com/search/default.aspx?type=school&search=${team.display_name}&state=tx&gendersport=boys,football`,
          transform: function (body) {
            return cheerio.load(body);
          }
        }
      };
      optionsList.push(options);
    });
    resolve(optionsList, teams);
  });
}).then(teamOptions => {
  teamOptions.forEach(teamOption => {
    rp(teamOption.requestParam).then($ => {
      let results = [];
      $('.collaspe-space-top .results-list .row').each(function (index, element) {
        var teamLink = rootURL + $(element).find('.school-link').attr('href');
        var teamName = $(element).find('.school-link').contents().first().text();

        if (teamName == teamOption.team.display_name && !teamOption.team.team_image) {
          // var teamMascot = _.upperFirst($(element).find('.school-name.row-column-2').text());
          results.push({
            uri: teamLink,
            transform: function (body) {
              return cheerio.load(body);
            }
          });
        }
      });
      return results;
    }).then(function (result) {
      result.forEach(imageOptions => {
        rp(imageOptions).then($ => {
          let teamImageURL;

          try {
            teamImageURL = $('.mascot-image img').attr('src') ? $('.mascot-image img').attr('src') : null;
          } catch (err) {
            console.log(err);
          }

          if (teamImageURL != null) {
            var params = {
              TableName: 'dmn_teams',
              Key: {
                team_id: teamOption.team.team_id
              },
              UpdateExpression: 'set #teamPic = :url',
              ExpressionAttributeNames: {
                '#teamPic': 'team_image'
              },
              ExpressionAttributeValues: {
                ':url': teamImageURL
              }
            };
            docClient.update(params, function (err, data) {
              if (err) {
                console.log(err);
                console.log(teamOption.team.display_name);
              } else {
                console.log('PROGRESS!!: ' + teamOption.team.display_name);
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      });
    }).catch(err => {
      console.log(err);
    });
  });
}); // async function getAllTeams() {        
//     var params = {
//         TableName: "dmn_teams",
//     };
//     await docClient.scan(params, function(err, data) {
//         if (err) console.log(err);
//         else {
//             const teams = data.Items;
//             teams.forEach(team => {
//                 /***************************/
//                 const rootURL = "http://www.maxpreps.com"
//                 const options = {
//                     uri: `http://www.maxpreps.com/search/default.aspx?type=school&search=${team.display_name}&state=tx&gendersport=boys,football`,
//                     transform: function (body) {
//                         return cheerio.load(body);
//                     }
//                 };
//                 });
//         }
//     })
// }
// getAllTeams();