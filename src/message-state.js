
export default class MessengerState {
  /*
		outputText:
		parseText: function;
		determineNextState: function;
	*/

  //   constructor(stateNumber, outputTextFunc, determineNextStateFunc) {
  //     this.determineNextState = determineNextStateFunc;
  //     this.outputText = outputTextFunc;
  //     this.stateNumber = stateNumber;
  //   }

  get stateNumber() {
    return this.stateNumber;
  }
}
// Called in Flow Constructor
// var stateNumber = 0;
// var outputTextFunc = ( teamName ) => {return "Go {teamname}!"};
// var nextState = ( ) => {return 1;}
// flow.add(new MessengerState(stateNumber, outputTextFunc, nextState);
//
// var stateNumber = 1;
// var outputTextFunc = ( ) => {return "Do you want these settings (body parts)");
// var nextState = ( input JSON Response ) => { if (json.teamname1 = true) return 2; ...}
//
// Called in Lambda
// response = getResponse();
// state = getState(response.user);
// var nextState = state.determineNextState((JSON Body Response));
// sendMessage(nextState.outputText(JSON Body Response));
// saveNewState
