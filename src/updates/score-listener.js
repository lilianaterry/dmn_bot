import moment from 'moment';
import debug from 'debug';
import * as TeamPlayer from '../gateways/teamplayer';

const log = debug('scorelistener');

export default function checkForUpdates() {
  log('Checking for score updates now');
  TeamPlayer.getInProgressGames(moment({
    month: 10,
    day: 16,
    year: 2018,
  })).then((games) => {
    log('%O', games);
  }).catch((err) => {
    log('Something went wrong with the teamplayer call');
    log(err);
  });
}
