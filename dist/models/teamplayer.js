"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreUpdate = void 0;

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ScoreUpdate {
  constructor(data) {
    _defineProperty(this, "data", void 0);

    this.data = data;
  }

  getLastPlay() {
    let last = null;

    _.forEach(this.data.pbpData.SummaryQuarters, (v, k) => {
      // console.log('posession', v);
      if (!_.isEmpty(v.BallPossession)) {
        const lastKey = _.last(_.keys(v.BallPossession)); // console.log('last key', lastKey);


        last = {
          possession: v.BallPossession[lastKey],
          quarter: k
        };
      }
    });

    return last;
  }

  getLastScoringPlay() {
    let last = null;

    _.forEach(this.data.pbpData.SummaryQuarters, (v, k) => {
      // console.log('posession', v);
      if (!_.isEmpty(v.BallPossession)) {
        _.forEach(v.BallPossession, poss => {
          if (poss.ScoreChange && poss.AwayScoreCurr !== 0) {
            last = {
              possession: poss,
              quarter: k
            };
          }
        }); // console.log('last key', lastKey);

      }
    });

    return last;
  }

}

exports.ScoreUpdate = ScoreUpdate;