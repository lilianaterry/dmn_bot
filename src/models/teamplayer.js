
interface Team {
  id: string;
  name: string;
  teamCode: string;
  boxscore: [];
  teamStats: any;
  playerStats: any;
}

interface Game {
  GameID: string;
  GameStatStatus: string;
  GameStatsFinal: string;
  GameStatsDateTimeModified: string;
  GameScoreIsFinal: string;
}

interface Record {
  TimeLeft: string;
  SummaryEvent: string;
  SummaryType: string;
  SummaryDescription: string;
}

interface Possession {
  TeamName: string;
  ScoreChange: boolean;
  AwayScorePrev: number;
  HomeScorePrev: number;
  AwayScoreCurr: number;
  HomeScoreCurr: number;
  Records: {[string]: Record}
}

interface BallPosessionList {
  BallPossession: {[string]: Possession}
}

interface PlayByPlay {
  GameID: string;
  Season: string;
  AwayTeamCode: string;
  AwayTeamName: string;
  HomeTeamCode: string;
  HomeTeamName: string;
  SummaryQuarters: {
    '1st Quarter': BallPosessionList;
    '2nd Quarter': BallPosessionList;
    '3rd Quarter': BallPosessionList;
    '4th Quarter': BallPosessionList;
  };
}

interface GameInfo {
  GameID: string;
  GameStatStatus: string;
  SportID: string;
  SportName: string;
  GameSeason: string;
  GameAwayTeamID: string;
  awayTeamName: string;
  awayTeamCode: string;
  GameHomeTeamID: string;
  homeTeamName: string;
  homeTeamCode: string;
  GameDate: string;
  GameTime: string;
  GameMeetName: string;
  GameIsDistrict: string;
  GameIsPlayoff: string;
  GamePlayoffID: string;
  PlayoffName: string | null;
  GamePlayoffRound: string;
  GameIsTournament: string;
  GameTournamentID: string;
  TournamentName: string | null;
  GameTournamentRound: string;
  GameMeetSite: string;
  GameLocation: string;
  GameScoreIsFinal: string;
  GameIsLiveScoring: string;
  GameStatsFinal: string;
  GameIsNeutral: string;
  GameProjectedUpset: string;
  NeutralSite: string;
  GameStatsDateTimeModified: string;
  GamePeriod: string;
  GamePeriodTime: string;
  GameUpdate: string;
  GameHasUpdate: string;
}

interface TeamInfo {
  TeamID: string;
  TeamName: string;
  TeamCode: string;
  TeamNickname: string;
  TeamAbbrevSmall: string;
  TeamAbbrevMedium: string;
  TeamAbbrevLarge: string;
  TeamHeadCoach: string;
  TeamAssistantCoaches: string;
  TeamCoachWorkEmail: string;
  TeamCoachWorkPhone: string;
  TeamCoachCellPhone: string;
  SportID: string;
  SportName: string;
  DistrictID: string;
  DistrictName: string;
  ClassID: string;
  ClassName: string;
  ConferenceID: string;
  ConferenceName: string;
  SchoolID: string;
  SchoolName: string;
  SchoolCode: string;
  SchoolAbbrevSmall: string;
  SchoolAbbrevMedium: string;
  SchoolAbbrevLarge: string;
  SchoolAddress: string;
  SchoolCity: string;
  SchoolState: string;
  SchoolZip: string;
  SchoolPhone: string;
  SchoolFax: string;
  SchoolEmailAddress: string;
  SchoolURL: string;
  SchoolLatitude: string;
  SchoolLongitude: string;
}

interface Player {
  PlayerID: string;
  PlayerFirstName: string;
  PlayerLastName: string;
  PlayerYear: string;
  PlayerHeightFeet: string;
  PlayerHeightInches: string;
  PlayerWeight: string;
  TeamRosterPlayerNumber: string;
  TeamRosterPosition: string;
  TeamRosterAdditionalPositions: string;
}

interface SeasonStats {
  Win: string;
  Loss: string;
  TotalYards: string;
  AverageOffensiveYards: number;
  AverageDefensiveYards: number;
  FirstDowns: string;
  RushingAttempts: string;
  RushingYards: string;
  PassCompletions: string;
  PassAttempts: string;
  PassingInterceptions: string;
  PassingYards: string;
  PassCompletionPercentage: number;
  Punts: string;
  PuntingYards: string;
  PuntingAverage: string;
  Fumbles: string;
  FumblesLost: string;
  Penalties: string;
  PenaltyYards: string;
  AverageRush: number;
}

export interface ScoreUpdate {
  away: Team;
  home: Team;
  gameData: Game;
  pbpData: PlayByPlay
}

export interface GameData {
 gameInfo: GameInfo;
 away: {
   team: TeamInfo,
   roster: Player[],
   seasonstats: SeasonStats,
 };
 home: {
   team: TeamInfo,
   roster: Player[],
   seasonstats: SeasonStats,
 };
}
