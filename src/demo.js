import MessengerApi from './replies/messenger-api';

const messenger = new MessengerApi();
const psid = '2096398860379510';

function sendScore(team1, team2, team1Score, team2Score, play) {
    const text = `${play}\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}

function sendScoreCard() {

}

function sendQTR(quarter, team1, team2, team1Score, team2Score) {
    const text = `End of ${quarter} quarter:\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}

function sendEndOfGame(team1, team2, team1Score, team2Score) {
    const text = `FINAL SCORE:\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}


const play = 'Carson Collins pass complete to Solomon Aweke for 50 yards to AO 0. FIRST DOWN. TOUCHDOWN. (Tyler Loop PAT KICK GOOD.)';
const team1 = 'Carthage';
const team2 = 'Midlothian Heritage';
const team1Score = '21';
const team2Score = '35';

const quarter = '1st';

const team1Id: '';
const team2Id: '';

// sendScore(team1, team2, team1Score, team2Score, play);
// sendQTR(quarter, team1, team2, team1Score, team2Score);
sendEndOfGame(team1, team2, team1Score, team2Score);