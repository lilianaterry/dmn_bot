const AWS = require('aws-sdk');
const fs = require('fs');
let cheerio = require('cheerio');
const rp = require('request-promise');
const _ = require('lodash');


const validAreas = ["Highland Park", "Wylie", "Valley View", "Madison", "John Paul II", "Roosevelt"]

AWS.config.update({
    region: 'us-east-1',
  });

const docClient = new AWS.DynamoDB.DocumentClient();

let teams;
fs.readFile(__dirname + '/result.json', function read(err, data) {
    if (err) {
        throw err;
    } else {
        teams = JSON.parse(data);
    }
});

function getAllTeams() {
    var params = {
        TableName: "dmn_teams",
    };

    docClient.scan(params, function(err, data) {
        if (err) console.log(err);
        else {
            const teams = data.Items;
            teams.forEach(team => {
                /***************************/

                const rootURL = "http://www.maxpreps.com"

                const options = {
                    uri: `http://www.maxpreps.com/search/default.aspx?type=school&search=${team.display_name}&state=tx&gendersport=boys,football`,
                    transform: function (body) {
                    return cheerio.load(body);
                    }
                };

                rp(options)
                    .then(($) => {
                        teamsList = [];
                        promises = []
                        $('.collaspe-space-top .results-list .row').each(function(index, element) {
                            var teamLink = rootURL + $(element).find('.school-link').attr('href');
                            var teamName = $(element).find('.school-link').contents().first().text();
                            if (teamName == team.display_name) {


                                    var teamMascot = _.upperFirst($(element).find('.school-name.row-column-2').text());

                                    const imageOptions = {
                                        uri: teamLink,
                                        transform: function (body) {
                                        return cheerio.load(body);
                                        }
                                    };

                                    rp(imageOptions)
                                        .then(($) => {
                                            let teamImageURL;
                                            try {
                                                teamImageURL = $('.mascot-image img').attr('src') ? $('.mascot-image img').attr('src') : null;
                                            } catch(err) {
                                                console.log(err);
                                            }
                                            docClient.
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        }));
                                });
                            })
                            .catch((err) => {
                            //   console.log(err);
                            });
                        }
                    })
                });
            });
        }
     });
}

function writeTeam() {

}

getAllTeams();