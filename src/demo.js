import MessengerApi from './replies/messenger-api';
import { ScorecardGenerator } from './gen-images';

const messenger = new MessengerApi();
const psid = '2096398860379510';
const gen = new ScorecardGenerator();

function sendScore(team1, team2, team1Score, team2Score, play) {
    const text = `${play}\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}

async function sendScoreCard(final, team1, team2, team1Score, team2Score, team1Image, team2Image, time, quarter, possession) {
    try {
        const cardPath = await gen.generate(
            final, 
            team1,
            team2,
            team1Score,
            team2Score,
            team1Image,
            team2Image,
            time,
            quarter,
            possession);

        console.log(cardPath);
        
        const imageId = await messenger.uploadImageAttachment(cardPath);

        console.log(imageId);
        messenger.sendImageAttachmentWithId(psid, imageId);
        gen.cleanup();
    } catch(err) {
        console.log(err);
    }
}

function sendQTR(quarter, team1, team2, team1Score, team2Score) {
    const text = `End of ${quarter} quarter:\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}

function sendEndOfGame(team1, team2, team1Score, team2Score) {
    const text = `FINAL SCORE:\n\n${team1}: ${team1Score}\n${team2}: ${team2Score}`;

    messenger.sendTextMessage(psid, text);
}


const play = 'Run FARRRRRRR';

const team1 = 'Sanger';
const team2 = 'Carthage';

const team1Score = '7';
const team2Score = '0';

const quarter = '2nd';

const team1Image = 'https://dw3jhbqsbya58.cloudfront.net/fit-in/210x89/school-mascot/e/5/9/e59c57a1-2080-4f3d-b660-5532bf34a950.gif?version=636208622400000000';
const team2Image = 'https://dw3jhbqsbya58.cloudfront.net/fit-in/210x89/school-mascot/5/5/6/556cde7f-6469-4bd0-934c-fe78b5949f68.gif?version=633651561600000000';

const final = true;
const time = '45:52';
const possession = 'home';

sendScoreCard(final, team1, team2, team1Score, team2Score, team1Image, team2Image, time, quarter, possession);
// sendScore(team1, team2, team1Score, team2Score, play);
// sendQTR(quarter, team1, team2, team1Score, team2Score);
sendEndOfGame(team1, team2, team1Score, team2Score);


