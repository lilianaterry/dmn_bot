import * as request from 'request-promise';
import { Moment } from 'moment';
import debug from 'debug';

const log = debug('teamplayer');

const TEAM_PLAYER_API_URL = 'http://belo-web1.newsengin.com/dallas/tpweb/web/gateway.php';

function callApi(template: string, params: any) {
  return request.get(TEAM_PLAYER_API_URL, {
    qs: {
      site: 'default',
      tpl: template,
      contentType: 'json',
      ...params,
    },
  });
}

export async function getInProgressGames(searchDate: Moment) {
  log(`Calling getInProgressGames() with date: ${searchDate.toString()}`);
  let response;
  try {
    response = await callApi('API_GamesInProgress', { SearchDate: searchDate.toISOString() });
  } catch (e) {
    throw new Error(`Something went wrong with getting in progress games: ${e.message}`);
  }
  log('Response: %O', response);
  return JSON.parse(response);
}

export async function getGameData(gameId: number) {
  log(`Calling getGameData() with gameId: ${gameId}`);
  let response;
  try {
    response = await callApi('API_GameData', { ID: gameId });
  } catch (e) {
    throw new Error(`Something went wrong with getting game data: ${e.message}`);
  }
  log('Response: %O', response);
  return JSON.parse(response);
}

export async function getScoreUpdates(gameId: number) {
  log(`Calling getScoreUpdates() with gameId: ${gameId}`);
  let response;
  try {
    response = await callApi('API_GameStats', { ID: gameId });
  } catch (e) {
    throw new Error(`Something went wrong with getting score updates: ${e.message}`);
  }
  log('Response: %O', response);
  return JSON.parse(response);
}
