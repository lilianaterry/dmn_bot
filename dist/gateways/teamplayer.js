"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInProgressGames = getInProgressGames;
exports.getGameData = getGameData;
exports.getScoreUpdates = getScoreUpdates;

var request = _interopRequireWildcard(require("request-promise"));

var _moment = _interopRequireDefault(require("moment"));

var _debug = _interopRequireDefault(require("debug"));

var _teamplayer = require("../models/teamplayer");

var _testData = require("../test-data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const log = (0, _debug.default)('teamplayer');
const TEAM_PLAYER_API_URL = 'http://belo-web1.newsengin.com/dallas/tpweb/web/gateway.php';

function callApi(template, params) {
  return request.get(TEAM_PLAYER_API_URL, {
    qs: {
      site: 'default',
      tpl: template,
      contentType: 'json',
      ...params
    }
  });
}

async function getInProgressGames(searchDate) {
  log(`Calling getInProgressGames() with date: ${searchDate.toString()}`);
  let response;

  try {
    response = await callApi('API_GamesInProgress', {
      SearchDate: searchDate.toISOString()
    }); // response = JSON.stringify(['101442']);
  } catch (e) {
    throw new Error(`Something went wrong with getting in progress games: ${e.message}`);
  }

  log('Got response');
  return JSON.parse(response);
}

async function getGameData(gameId) {
  log(`Calling getGameData() with gameId: ${gameId}`);
  let response;

  try {
    response = await callApi('API_GameData', {
      ID: gameId
    }); // response = JSON.stringify(gameData);
  } catch (e) {
    throw new Error(`Something went wrong with getting game data: ${e.message}`);
  }

  log('Got response'); // log('%O', response);

  return JSON.parse(response);
}

async function getScoreUpdates(gameId) {
  log(`Calling getScoreUpdates() with gameId: ${gameId}`);
  let response;

  try {
    response = await callApi('API_GameStats', {
      ID: gameId
    }); // response = JSON.stringify(scoreUpdate);
  } catch (e) {
    throw new Error(`Something went wrong with getting score updates: ${e.message}`);
  }

  log('Got response');
  return new _teamplayer.ScoreUpdate(JSON.parse(response));
}