import Database from './table-operations';
import MessageState from './message-state';
import Strings from './strings';

export default class UserFlow {

    // TODO: add string variable injection 

    constructor (userId, userInput) {
        this.userId = userId;
        this.userInput = userInput;
        this.currState = getUserState();
        this.executeState();
        this.saveState();
    }

    getUserState () {
        this.database = new Database('dmn-users');
        return this.database.getUserFlowState(this.userId);
    }

    executeState() {
        const strings = new Strings();
        switch (this.userState) {
            case 0:
                this.outputMessage = [strings.Messages.welcome_message];
                this.newState = 1;
                break;
            case 1:
                var valid = this.validateTeamName();
                if (valid) {
                    this.newState = 2;
                    // TODO: save team to user subscriptions
                    this.outputMessage = [strings.Messages.teamName_success,
                                            strings.Messages.rivalTeamName_message];
                } else {
                    this.newState = 3;
                    this.outputMessage = [strings.Messages.teamName_error];
                }
                break;
            case 2:
                if (this.userInput == "skip") {
                    this.newState = 5;
                    this.outputMessage = [strings.Messages.featurePreference_message];
                } else {
                    var valid = this.validateTeamName();
                    if (valid) {
                        // TODO: save team to user subscriptions 
                        this.newState = 4;
                        this.outputMessage = [strings.Messages.teamNickName_success];
                    } else {
                        this.newState = 3;
                        this.outputMessage = [strings.Messages.teamName_error];
                    }
                }
                break;
            case 3: 
                var valid = this.validateTeamName();
                if (valid) {
                    // TODO: save team to user subsciptions 
                    this.newState = 4;
                    this.outputMessage = [strings.Messages.teamNickName_success];
                } else {
                    this.newState = 3;
                    this.outputMessage = [strings.Messages.teamName_error];
                }
                break;
            case 4:
                if (this.userInput == "yes") {
                    this.newState = 3;
                    this.outputMessage = [strings.Messages.teamName_error];
                } else {
                    this.newState = 5;
                    this.outputMessage = [strings.Messages.featurePreference_message];
                }
                break;
            case 5:
                if (this.userInput = "yes") {
                    // TODO: save user preference to all
                    this.newState = 8;
                    this.outputMessage = [strings.Messages.frequencyPreference_message];
                } else {
                    this.newState = 6;
                    this.outputMessage = [strings.Messages.turnOffBaseFeatures_message];
                }
                break;
            case 6:
                // TODO: save user preferences based on response
                this.newState = 7;
                this.outputMessage = [strings.Messages.turnOffExtendedFeatures_message];
                break;
            case 7: 
                if (this.userInput == "good to go") {
                    this.newState = 8;
                    this.outputMessage = [strings.Messages.setupComplete_message];
                } else {
                    this.newState = 7;
                    this.outputMessage = [strings.Messages.turnOffExtendedFeatures_message];
                }
                break;
            case 8:
                // TODO: save user preferences based on response
                this.newState = 9;
                this.outputMessage = [strings.Messages.setupComplete_message];
                break;
        }
            
    }

    saveState () {
        this.database.setUserFlowState(this.userId, this.newState);
    }

    validateTeamName() {
        var teams = ["Klein Oak High School", "Klein High School", "Klein Collins High School", "Klein Forrest High School"];
        if (teams.contains(this.userInput)) 
            return true;
        return false;
    }
}
