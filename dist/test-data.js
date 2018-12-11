"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scoreUpdate = exports.gameData = void 0;
const gameData = {
  gameInfo: {
    GameID: '101442',
    GameStatStatus: '3',
    SportID: '1',
    SportName: 'Football',
    GameSeason: '2018',
    GameAwayTeamID: '4510',
    awayTeamName: 'Carter',
    awayTeamCode: 'AR',
    GameHomeTeamID: '887',
    homeTeamName: 'Arlington Sam Houston',
    homeTeamCode: 'AH',
    GameDate: '2018-11-01',
    GameTime: '19:00:00',
    GameMeetName: '',
    GameIsDistrict: '1',
    GameIsPlayoff: '0',
    GamePlayoffID: '0',
    PlayoffName: null,
    GamePlayoffRound: '',
    GameIsTournament: '0',
    GameTournamentID: '0',
    TournamentName: null,
    GameTournamentRound: '',
    GameMeetSite: '0',
    GameLocation: '4237',
    GameScoreIsFinal: '1',
    GameIsLiveScoring: '1',
    GameStatsFinal: '0',
    GameIsNeutral: '1',
    GameProjectedUpset: '0',
    NeutralSite: "Arlington's Wilemon Field",
    GameStatsDateTimeModified: '2018-11-01 21:29:59',
    GamePeriod: '',
    GamePeriodTime: '',
    GameUpdate: '0',
    GameHasUpdate: '0'
  },
  away: {
    team: {
      TeamID: '4510',
      TeamName: 'Carter',
      TeamCode: 'AR',
      TeamNickname: 'Colts',
      TeamAbbrevSmall: '',
      TeamAbbrevMedium: '',
      TeamAbbrevLarge: '',
      TeamHeadCoach: 'Scott Peach',
      TeamAssistantCoaches: '',
      TeamCoachWorkEmail: 'speach@aisd.net',
      TeamCoachWorkPhone: '682-867-6461',
      TeamCoachCellPhone: '817-271-6760',
      SportID: '1',
      SportName: 'Football',
      DistrictID: '343',
      DistrictName: '4-6A',
      ClassID: '11',
      ClassName: 'CLASS 6A',
      ConferenceID: null,
      ConferenceName: null,
      SchoolID: '472',
      SchoolName: 'Arlington',
      SchoolCode: 'ARL',
      SchoolAbbrevSmall: 'ARL',
      SchoolAbbrevMedium: 'Arlington',
      SchoolAbbrevLarge: 'Arlington',
      SchoolAddress: '818 W. Park Row',
      SchoolCity: 'Arlington',
      SchoolState: 'TX',
      SchoolZip: '76013',
      SchoolPhone: '',
      SchoolFax: '',
      SchoolEmailAddress: 'speach@aisd.net',
      SchoolURL: '',
      SchoolLatitude: '32.721054',
      SchoolLongitude: '-97.116646'
    },
    roster: [{
      PlayerID: '3524',
      PlayerFirstName: 'Daniel',
      PlayerLastName: 'Adelowo',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '24',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3563',
      PlayerFirstName: 'Jerson',
      PlayerLastName: 'Alas',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '66',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3543',
      PlayerFirstName: 'Razi',
      PlayerLastName: 'Almas',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '45',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3573',
      PlayerFirstName: 'Hayden',
      PlayerLastName: 'Alt',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '81',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3529',
      PlayerFirstName: 'Aidan',
      PlayerLastName: 'Backs',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '30',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3528',
      PlayerFirstName: 'Zander',
      PlayerLastName: 'Benson',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '29',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3508',
      PlayerFirstName: 'Charles',
      PlayerLastName: 'Brown',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '6',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3518',
      PlayerFirstName: 'Seth',
      PlayerLastName: 'Browning',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '16',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3561',
      PlayerFirstName: 'Connor',
      PlayerLastName: 'Canaday',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '64',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3547',
      PlayerFirstName: 'Tavron',
      PlayerLastName: 'Carter',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '49',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3564',
      PlayerFirstName: 'Max',
      PlayerLastName: 'Castillo',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '68',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3555',
      PlayerFirstName: 'Caleb',
      PlayerLastName: 'Cerda',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '58',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3512',
      PlayerFirstName: 'Trey',
      PlayerLastName: 'Cleveland',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '10',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3565',
      PlayerFirstName: 'Samson',
      PlayerLastName: 'Croucher',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '70',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3560',
      PlayerFirstName: 'Andrew',
      PlayerLastName: 'Cruz',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '63',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3516',
      PlayerFirstName: 'Kyree',
      PlayerLastName: 'Dailey',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '14',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10254',
      PlayerFirstName: "L'Dominique",
      PlayerLastName: 'Davis',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '50',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3552',
      PlayerFirstName: 'Brian',
      PlayerLastName: 'DeClercq',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '55',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '14582',
      PlayerFirstName: 'Victor',
      PlayerLastName: 'Ezeagba',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '93',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3536',
      PlayerFirstName: 'Dawson',
      PlayerLastName: 'Felts',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '38',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3551',
      PlayerFirstName: 'Joey',
      PlayerLastName: 'Felts',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '54',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3542',
      PlayerFirstName: 'Jared',
      PlayerLastName: 'Flores',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '44',
      TeamRosterPosition: 'TE',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3507',
      PlayerFirstName: 'Qaklon',
      PlayerLastName: 'Fore',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '5',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '11495',
      PlayerFirstName: 'Wyatt',
      PlayerLastName: 'Gardner',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '5',
      PlayerHeightInches: '11',
      PlayerWeight: '150',
      TeamRosterPlayerNumber: '7',
      TeamRosterPosition: 'QB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3572',
      PlayerFirstName: 'Isaac',
      PlayerLastName: 'Garza',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '80',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3576',
      PlayerFirstName: 'Casey',
      PlayerLastName: 'Green',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '90',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3562',
      PlayerFirstName: 'Zane',
      PlayerLastName: 'Hammond',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '65',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3514',
      PlayerFirstName: 'Willie',
      PlayerLastName: 'Hartfield',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '12',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3530',
      PlayerFirstName: 'Christian',
      PlayerLastName: 'Herrera',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '31',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10255',
      PlayerFirstName: 'Antonio',
      PlayerLastName: 'Holman-Franco',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '82',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3533',
      PlayerFirstName: 'James',
      PlayerLastName: 'Johnson',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '35',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3532',
      PlayerFirstName: 'Griffin',
      PlayerLastName: 'Kell',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '34',
      TeamRosterPosition: 'K',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3546',
      PlayerFirstName: 'Micah',
      PlayerLastName: 'Kendrick',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '48',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3549',
      PlayerFirstName: 'Tyrin',
      PlayerLastName: 'King',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '52',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3557',
      PlayerFirstName: 'Cecil',
      PlayerLastName: 'Leonard',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '60',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '14581',
      PlayerFirstName: 'Antonio',
      PlayerLastName: 'Leonardi',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '91',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3558',
      PlayerFirstName: 'Preston',
      PlayerLastName: 'Long',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '61',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3540',
      PlayerFirstName: 'AJ',
      PlayerLastName: 'Lopez',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '42',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3515',
      PlayerFirstName: 'Rodney',
      PlayerLastName: 'Luckey',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '13',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3545',
      PlayerFirstName: 'Alex',
      PlayerLastName: 'Marquez',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '47',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3527',
      PlayerFirstName: 'Jabyron',
      PlayerLastName: 'McCoy',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '28',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10251',
      PlayerFirstName: "A'Tavion",
      PlayerLastName: 'McDonald',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '19',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10250',
      PlayerFirstName: "X'Zavion",
      PlayerLastName: 'McDonald',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '17',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3566',
      PlayerFirstName: 'Kevaugnte',
      PlayerLastName: 'McGowan',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '73',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3577',
      PlayerFirstName: 'Noe',
      PlayerLastName: 'Mendez',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '92',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3567',
      PlayerFirstName: 'Ben',
      PlayerLastName: 'Nascimbeni',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '75',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3521',
      PlayerFirstName: 'Miles',
      PlayerLastName: 'Nealy',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '21',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3570',
      PlayerFirstName: 'Mark',
      PlayerLastName: 'Perez',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '78',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3525',
      PlayerFirstName: 'Ladarian',
      PlayerLastName: 'Perry',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '26',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3539',
      PlayerFirstName: 'Ty',
      PlayerLastName: 'Perry',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '41',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3559',
      PlayerFirstName: 'Will',
      PlayerLastName: 'Plush',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '62',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3531',
      PlayerFirstName: 'Dominic',
      PlayerLastName: 'Reeves',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '33',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '14580',
      PlayerFirstName: 'Kevin',
      PlayerLastName: 'Richard',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '74',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3556',
      PlayerFirstName: 'Justin',
      PlayerLastName: 'Robinson',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '59',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3517',
      PlayerFirstName: 'BJ',
      PlayerLastName: 'Rogers',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '15',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3506',
      PlayerFirstName: 'Jahari',
      PlayerLastName: 'Rogers',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '4',
      TeamRosterPosition: 'QB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10252',
      PlayerFirstName: "Zy'Treon",
      PlayerLastName: 'Rucker',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '25',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3504',
      PlayerFirstName: 'Pierce',
      PlayerLastName: 'Salyer',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '2',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3554',
      PlayerFirstName: 'Cole',
      PlayerLastName: 'Schulte',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '57',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3550',
      PlayerFirstName: 'Spencer',
      PlayerLastName: 'Shea',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '53',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3568',
      PlayerFirstName: 'Dakota',
      PlayerLastName: 'Shirley',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '76',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3510',
      PlayerFirstName: 'Kris',
      PlayerLastName: 'Sims',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '8',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: 'QB'
    }, {
      PlayerID: '3534',
      PlayerFirstName: 'Khled',
      PlayerLastName: 'Singleton',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '36',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3537',
      PlayerFirstName: 'Riece',
      PlayerLastName: 'Sosa',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '39',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3571',
      PlayerFirstName: 'Cameron',
      PlayerLastName: 'Starrett',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '79',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3502',
      PlayerFirstName: 'Team',
      PlayerLastName: 'Stat',
      PlayerYear: '',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '',
      TeamRosterPosition: '',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3548',
      PlayerFirstName: 'Drake',
      PlayerLastName: 'Stokes',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '51',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3575',
      PlayerFirstName: 'Jordan',
      PlayerLastName: 'Thomason',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '84',
      TeamRosterPosition: 'TE',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3503',
      PlayerFirstName: 'Tucker',
      PlayerLastName: 'Thompson',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '1',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3520',
      PlayerFirstName: 'Kaleb',
      PlayerLastName: 'Tobias',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '20',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '11496',
      PlayerFirstName: 'Richard',
      PlayerLastName: 'Toney',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '6',
      PlayerHeightInches: '0',
      PlayerWeight: '160',
      TeamRosterPlayerNumber: '37',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '15642',
      PlayerFirstName: 'Demarea',
      PlayerLastName: 'Turner',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '11',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3511',
      PlayerFirstName: 'Jeffrey',
      PlayerLastName: 'Waldrop',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '9',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3541',
      PlayerFirstName: 'DJ',
      PlayerLastName: 'Walker',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '43',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3569',
      PlayerFirstName: 'Quintyn',
      PlayerLastName: 'Walls',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '77',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3513',
      PlayerFirstName: 'Mekhi',
      PlayerLastName: 'Watson',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '32',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: 'LB'
    }, {
      PlayerID: '3526',
      PlayerFirstName: 'Marcus',
      PlayerLastName: 'Wess',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '27',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3505',
      PlayerFirstName: 'Kyron',
      PlayerLastName: 'White',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '3',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3522',
      PlayerFirstName: 'Nate',
      PlayerLastName: 'White',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '22',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3519',
      PlayerFirstName: 'Nate',
      PlayerLastName: 'Winters',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '18',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3553',
      PlayerFirstName: 'Bo',
      PlayerLastName: 'Witcher',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '56',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '3523',
      PlayerFirstName: 'Hugh',
      PlayerLastName: 'Zelder',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '23',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }],
    seasonstats: {
      Win: '11',
      Loss: '1',
      TotalYards: '4975',
      AverageOffensiveYards: 414.58,
      AverageDefensiveYards: 331.58,
      FirstDowns: '198',
      RushingAttempts: '336',
      RushingYards: '2412',
      PassCompletions: '134',
      PassAttempts: '221',
      PassingInterceptions: '6',
      PassingYards: '2563',
      PassCompletionPercentage: 60.63,
      Punts: '22',
      PuntingYards: '839',
      PuntingAverage: '38.1364',
      Fumbles: '14',
      FumblesLost: '7',
      Penalties: '86',
      PenaltyYards: '776',
      AverageRush: 7.18
    }
  },
  home: {
    team: {
      TeamID: '887',
      TeamName: 'Arlington Sam Houston',
      TeamCode: 'AH',
      TeamNickname: '',
      TeamAbbrevSmall: '',
      TeamAbbrevMedium: '',
      TeamAbbrevLarge: '',
      TeamHeadCoach: 'Anthony Criss',
      TeamAssistantCoaches: '',
      TeamCoachWorkEmail: 'acriss@aisd.net',
      TeamCoachWorkPhone: '682-867-8518',
      TeamCoachCellPhone: '817-929-6818',
      SportID: '1',
      SportName: 'Football',
      DistrictID: '343',
      DistrictName: '4-6A',
      ClassID: '11',
      ClassName: 'CLASS 6A',
      ConferenceID: null,
      ConferenceName: null,
      SchoolID: '479',
      SchoolName: 'Arlington Sam Houston',
      SchoolCode: 'SAM',
      SchoolAbbrevSmall: 'SAM',
      SchoolAbbrevMedium: 'Arl. Sam Hou.',
      SchoolAbbrevLarge: 'Arl. Sam Houston',
      SchoolAddress: '2000 Sam Houston Drive',
      SchoolCity: 'Arlington',
      SchoolState: 'TX',
      SchoolZip: '76014',
      SchoolPhone: '',
      SchoolFax: '',
      SchoolEmailAddress: 'kperry@aisd.com',
      SchoolURL: '',
      SchoolLatitude: '32.704550',
      SchoolLongitude: '-97.077975'
    },
    roster: [{
      PlayerID: '10559',
      PlayerFirstName: 'Malek',
      PlayerLastName: 'Al-Sadaq',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '45',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10558',
      PlayerFirstName: 'Isaiah',
      PlayerLastName: 'Anderson',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '44',
      TeamRosterPosition: 'TE',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10542',
      PlayerFirstName: 'Aneaus',
      PlayerLastName: 'Boldon',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '32',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10546',
      PlayerFirstName: 'Patrick',
      PlayerLastName: 'Boulieu',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '24',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10571',
      PlayerFirstName: 'Eric',
      PlayerLastName: 'Bradford',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '70',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10535',
      PlayerFirstName: 'Darrell',
      PlayerLastName: 'Brantley',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '8',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10567',
      PlayerFirstName: 'Aaron',
      PlayerLastName: 'Caro',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '61',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10531',
      PlayerFirstName: 'Javione',
      PlayerLastName: 'Carr',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '3',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10555',
      PlayerFirstName: 'Angel',
      PlayerLastName: 'Chavez',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '40',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10576',
      PlayerFirstName: 'Joquan',
      PlayerLastName: 'Clark',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '76',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10538',
      PlayerFirstName: 'Raylin',
      PlayerLastName: 'Coffield',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '12',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10539',
      PlayerFirstName: "Ty'riek",
      PlayerLastName: 'Colston',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '13',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10550',
      PlayerFirstName: 'Lajavian',
      PlayerLastName: 'Cook',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '30',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10575',
      PlayerFirstName: 'Jalen',
      PlayerLastName: 'Covington',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '75',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10584',
      PlayerFirstName: 'Omar',
      PlayerLastName: 'Darame',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '92',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10536',
      PlayerFirstName: 'Quinten',
      PlayerLastName: 'Darden',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '5',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10565',
      PlayerFirstName: 'Steve',
      PlayerLastName: 'Delorbe',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '58',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10554',
      PlayerFirstName: 'Michael',
      PlayerLastName: 'Evans',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '35',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10530',
      PlayerFirstName: 'Juan',
      PlayerLastName: 'Garza',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '2',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10556',
      PlayerFirstName: 'Matthew',
      PlayerLastName: 'Gonzalez',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '77',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10578',
      PlayerFirstName: 'Kenzi',
      PlayerLastName: 'Gopie',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '80',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10541',
      PlayerFirstName: 'Ethan',
      PlayerLastName: 'Harris',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '15',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10537',
      PlayerFirstName: 'Erik',
      PlayerLastName: 'Hernandez',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '10',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10557',
      PlayerFirstName: 'Jacoby',
      PlayerLastName: 'Hildreth',
      PlayerYear: 'Freshman',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '43',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10570',
      PlayerFirstName: 'Pedro',
      PlayerLastName: 'Holguin',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '64',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10552',
      PlayerFirstName: 'Samarte',
      PlayerLastName: 'Holts',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '33',
      TeamRosterPosition: 'DE',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10553',
      PlayerFirstName: 'LaReco',
      PlayerLastName: 'Johnson',
      PlayerYear: 'Freshman',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '34',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10564',
      PlayerFirstName: 'Jesus',
      PlayerLastName: 'Jurado',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '57',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10581',
      PlayerFirstName: 'Presley',
      PlayerLastName: 'Kentchadjin',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '20',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '15252',
      PlayerFirstName: 'Marcus',
      PlayerLastName: 'Keys',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '22',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10562',
      PlayerFirstName: 'Kaleb',
      PlayerLastName: 'Lee',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '54',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10568',
      PlayerFirstName: 'Emmanuel',
      PlayerLastName: 'Malek',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '62',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10572',
      PlayerFirstName: 'Erick',
      PlayerLastName: 'Martinez',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '71',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '15917',
      PlayerFirstName: 'Francisco',
      PlayerLastName: 'Mata',
      PlayerYear: '',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '50',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10560',
      PlayerFirstName: 'Roderick',
      PlayerLastName: 'McCloud',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '56',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10545',
      PlayerFirstName: 'Jezon',
      PlayerLastName: 'Middleton',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '23',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '16092',
      PlayerFirstName: 'Omari',
      PlayerLastName: 'Milton',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '9',
      TeamRosterPosition: 'QB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10529',
      PlayerFirstName: 'Brandon',
      PlayerLastName: 'Nash',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '1',
      TeamRosterPosition: 'QB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10543',
      PlayerFirstName: 'Tony',
      PlayerLastName: 'Nguyen',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '21',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10579',
      PlayerFirstName: 'Angel',
      PlayerLastName: 'Ojeda',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '81',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10582',
      PlayerFirstName: 'Bryce',
      PlayerLastName: 'Oliver',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '7',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10580',
      PlayerFirstName: 'Tyler',
      PlayerLastName: 'Paul',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '82',
      TeamRosterPosition: 'WR',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10534',
      PlayerFirstName: 'Caleb',
      PlayerLastName: 'Perry',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '26',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10583',
      PlayerFirstName: 'Jose',
      PlayerLastName: 'Ramos',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '88',
      TeamRosterPosition: 'K',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10573',
      PlayerFirstName: 'Rey',
      PlayerLastName: 'Reyes',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '73',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10574',
      PlayerFirstName: 'Jacob',
      PlayerLastName: 'Rios',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '74',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10566',
      PlayerFirstName: 'Adrian',
      PlayerLastName: 'Robertson',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '60',
      TeamRosterPosition: 'OL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10561',
      PlayerFirstName: 'Uriel',
      PlayerLastName: 'Rodriguez',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '51',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10551',
      PlayerFirstName: 'Trevis',
      PlayerLastName: 'Sanders-Burrell',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '31',
      TeamRosterPosition: 'LB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10563',
      PlayerFirstName: 'Jacarri',
      PlayerLastName: 'Shed',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '55',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '15251',
      PlayerFirstName: 'Tyris',
      PlayerLastName: 'Simon',
      PlayerYear: 'Sophomore',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '14',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10528',
      PlayerFirstName: 'Team',
      PlayerLastName: 'Stat',
      PlayerYear: '',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '',
      TeamRosterPosition: '',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10549',
      PlayerFirstName: 'Prag',
      PlayerLastName: 'Tac',
      PlayerYear: 'Senior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '27',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10547',
      PlayerFirstName: 'Exzavier',
      PlayerLastName: 'Thomas',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '25',
      TeamRosterPosition: 'RB',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10569',
      PlayerFirstName: 'Cameron',
      PlayerLastName: 'Tripplet',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '63',
      TeamRosterPosition: 'DL',
      TeamRosterAdditionalPositions: ''
    }, {
      PlayerID: '10532',
      PlayerFirstName: 'Raquan',
      PlayerLastName: 'Williams',
      PlayerYear: 'Junior',
      PlayerHeightFeet: '0',
      PlayerHeightInches: '0',
      PlayerWeight: '',
      TeamRosterPlayerNumber: '4',
      TeamRosterPosition: 'DB',
      TeamRosterAdditionalPositions: ''
    }],
    seasonstats: {
      Win: '3',
      Loss: '7',
      TotalYards: '2828',
      AverageOffensiveYards: 282.8,
      AverageDefensiveYards: 392.6,
      FirstDowns: '147',
      RushingAttempts: '441',
      RushingYards: '2171',
      PassCompletions: '57',
      PassAttempts: '132',
      PassingInterceptions: '5',
      PassingYards: '657',
      PassCompletionPercentage: 43.18,
      Punts: '36',
      PuntingYards: '1102',
      PuntingAverage: '30.6111',
      Fumbles: '17',
      FumblesLost: '10',
      Penalties: '73',
      PenaltyYards: '567',
      AverageRush: 4.92
    }
  }
};
exports.gameData = gameData;
const scoreUpdate = {
  gameData: {
    GameID: '111879',
    GameScoreIsFinal: '0',
    GameStatStatus: '9',
    GameStatsFinal: '0',
    GameStatsDateTimeModified: '2018-11-16 19:55:01'
  },
  pbpData: {
    GameID: '111879',
    Season: '2018',
    AwayTeamCode: 'AM',
    AwayTeamName: 'Arlington Martin',
    HomeTeamCode: 'ET',
    HomeTeamName: 'Euless Trinity',
    SummaryQuarters: {
      '1st Quarter': {
        BallPossession: {
          1: {
            TeamName: 'Arlington Martin',
            ScoreChange: true,
            AwayScorePrev: 0,
            HomeScorePrev: 0,
            AwayScoreCurr: '7',
            HomeScoreCurr: 0,
            Records: {
              1: {
                TimeLeft: '12:00 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Start of Quarter',
                SummaryDescription: 'Start of 1st Quarter'
              },
              2: {
                TimeLeft: '11:56 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Kickoff Return',
                SummaryDescription: 'Montrell Smith returns kick 5 yards.'
              },
              3: {
                SummaryEvent: '1st down and 10 at AM 33',
                SummaryType: 'Run',
                SummaryDescription: 'Montrell Smith rush for 4 yards to AM 37.'
              },
              4: {
                TimeLeft: '11:01 left in 1st Quarter.',
                SummaryEvent: '2nd down and 6 at AM 37',
                SummaryType: 'Run',
                SummaryDescription: 'Willie Roberts rush for 63 yards to ET 0. FIRST DOWN. TOUCHDOWN. (Nick Rodriguez PAT KICK GOOD.)'
              }
            }
          },
          2: {
            TeamName: 'Euless Trinity',
            ScoreChange: true,
            AwayScorePrev: '7',
            HomeScorePrev: 0,
            AwayScoreCurr: '7',
            HomeScoreCurr: '7',
            Records: {
              1: {
                TimeLeft: '10:56 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Kickoff Return',
                SummaryDescription: 'Marcus Ervin returns kick 17 yards.'
              },
              2: {
                SummaryEvent: '1st down and 10 at ET 27',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 3 yards to ET 30.'
              },
              3: {
                SummaryEvent: '2nd down and 7 at ET 30',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 23 yards to AM 47. FIRST DOWN.'
              },
              4: {
                SummaryEvent: '1st down and 10 at AM 47',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 5 yards to AM 42.'
              },
              5: {
                SummaryEvent: '2nd down and 5 at AM 42',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 1 yards to AM 41.'
              },
              6: {
                SummaryEvent: '3rd down and 4 at AM 41',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 2 yards to AM 39.'
              },
              7: {
                TimeLeft: '8:04 left in 1st Quarter.',
                SummaryEvent: '4th down and 2 at AM 39',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 39 yards to AM 0. FIRST DOWN. TOUCHDOWN. (Asim Ljuso PAT KICK GOOD.)'
              }
            }
          },
          3: {
            TeamName: 'Arlington Martin',
            ScoreChange: false,
            AwayScorePrev: '7',
            HomeScorePrev: '7',
            AwayScoreCurr: '7',
            HomeScoreCurr: '7',
            Records: {
              1: {
                TimeLeft: '8:02 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Kickoff Return',
                SummaryDescription: 'Alonzo Banks returns kick 8 yards.'
              },
              2: {
                SummaryEvent: '1st down and 10 at AM 47',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for -3 yards to AM 44.'
              },
              3: {
                SummaryEvent: '2nd down and 13 at AM 44',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to Jonathan Carter for 13 yards to ET 43. FIRST DOWN.'
              },
              4: {
                SummaryEvent: '1st down and 10 at ET 43',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for 6 yards to ET 37.'
              },
              5: {
                TimeLeft: '6:38 left in 1st Quarter.',
                SummaryEvent: '2nd down and 4 at ET 37',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to Alonzo Banks for 8 yards to ET 29. FIRST DOWN.'
              },
              6: {
                TimeLeft: '6:34 left in 1st Quarter.',
                SummaryEvent: '1st down and 10 at ET 29',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Zach Mundell pass incomplete.'
              },
              7: {
                TimeLeft: '6:29 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Penalty Offense',
                SummaryDescription: 'AM penalized 10 yards.'
              },
              8: {
                TimeLeft: '6:25 left in 1st Quarter.',
                SummaryEvent: '2nd down and 20 at ET 39',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Zach Mundell pass incomplete.'
              },
              9: {
                SummaryEvent: '3rd down and 20 at ET 39',
                SummaryType: 'Run',
                SummaryDescription: 'Montrell Smith rush for 0 yards to ET 39.'
              },
              10: {
                TimeLeft: '5:38 left in 1st Quarter.',
                SummaryEvent: '4th down and 20 at ET 39',
                SummaryType: 'Punt',
                SummaryDescription: 'Sawyer Evans punts 38 yards to ET 1.'
              }
            }
          },
          4: {
            TeamName: 'Euless Trinity',
            ScoreChange: false,
            AwayScorePrev: '7',
            HomeScorePrev: '7',
            AwayScoreCurr: '7',
            HomeScoreCurr: '7',
            Records: {
              1: {
                SummaryEvent: '1st down and 10 at ET 1',
                SummaryType: 'Run',
                SummaryDescription: 'Laki Ellis rush for 2 yards to ET 3.'
              },
              2: {
                SummaryEvent: '2nd down and 8 at ET 3',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 2 yards to ET 5.'
              },
              3: {
                SummaryEvent: '3rd down and 6 at ET 5',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 3 yards to ET 8.'
              },
              4: {
                SummaryEvent: '4th down and 3 at ET 8',
                SummaryType: 'Punt',
                SummaryDescription: 'Ian Mason punts 7 yards to ET 15.'
              },
              5: {
                SummaryEvent: '1st down and 10 at ET 15',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 9 yards to ET 24.'
              },
              6: {
                TimeLeft: '3:31 left in 1st Quarter.',
                SummaryEvent: '',
                SummaryType: 'Timeout',
                SummaryDescription: 'Timeout.'
              },
              7: {
                SummaryEvent: '2nd down and 1 at ET 24',
                SummaryType: 'Run',
                SummaryDescription: 'Isaac Fakailoatanga rush for 0 yards to ET 24.'
              },
              8: {
                SummaryEvent: '3rd down and 1 at ET 24',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 1 yards to ET 25. FIRST DOWN.'
              },
              9: {
                TimeLeft: '2:22 left in 1st Quarter.',
                SummaryEvent: '1st down and 10 at ET 25',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Laki Ellis pass incomplete.'
              },
              10: {
                SummaryEvent: '2nd down and 10 at ET 25',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 3 yards to ET 28.'
              },
              11: {
                SummaryEvent: '',
                SummaryType: 'Penalty Offense',
                SummaryDescription: 'ET penalized 10 yards.'
              },
              12: {
                SummaryEvent: '2nd down and 17 at ET 18',
                SummaryType: 'Run',
                SummaryDescription: 'Laki Ellis rush for 0 yards to ET 18.'
              },
              13: {
                SummaryEvent: '3rd down and 17 at ET 18',
                SummaryType: 'Pass',
                SummaryDescription: 'Laki Ellis pass complete to Keanu Hill for 8 yards to ET 26.'
              },
              14: {
                TimeLeft: '0:33 left in 1st Quarter.',
                SummaryEvent: '4th down and 9 at ET 26',
                SummaryType: 'Punt',
                SummaryDescription: 'Ian Mason punts 32 yards to AM 42.'
              }
            }
          },
          5: {
            TeamName: 'Arlington Martin',
            ScoreChange: false,
            AwayScorePrev: '7',
            HomeScorePrev: '7',
            AwayScoreCurr: '7',
            HomeScoreCurr: '7',
            Records: {
              1: {
                SummaryEvent: '1st down and 10 at AM 42',
                SummaryType: 'Run',
                SummaryDescription: 'Montrell Smith rush for 6 yards to AM 48.'
              },
              2: {
                SummaryEvent: '',
                SummaryType: 'End of Quarter',
                SummaryDescription: 'End of 1st Quarter.'
              }
            }
          }
        }
      },
      '2nd Quarter': {
        BallPossession: {
          1: {
            TeamName: 'Arlington Martin',
            ScoreChange: true,
            AwayScorePrev: '7',
            HomeScorePrev: '7',
            AwayScoreCurr: '14',
            HomeScoreCurr: '7',
            Records: {
              1: {
                TimeLeft: '12:00 left in 2nd Quarter.',
                SummaryEvent: '',
                SummaryType: 'Start of Quarter',
                SummaryDescription: 'Start of 2nd Quarter'
              },
              2: {
                SummaryEvent: '2nd down and 4 at AM 48',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for 10 yards to ET 42. FIRST DOWN.'
              },
              3: {
                SummaryEvent: '',
                SummaryType: 'Penalty Offense',
                SummaryDescription: 'AM penalized 15 yards.'
              },
              4: {
                SummaryEvent: '1st down and 10 at AM 43',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to Willie Roberts for 18 yards to ET 39. FIRST DOWN.'
              },
              5: {
                SummaryEvent: '1st down and 10 at ET 39',
                SummaryType: 'Run',
                SummaryDescription: 'Willie Roberts rush for -1 yards to ET 40.'
              },
              6: {
                SummaryEvent: '2nd down and 11 at ET 40',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to Jonathan Carter for 18 yards to ET 22. FIRST DOWN.'
              },
              7: {
                SummaryEvent: '1st down and 10 at ET 22',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to KJ Polk for 8 yards to ET 14.'
              },
              8: {
                TimeLeft: '9:54 left in 2nd Quarter.',
                RedZone: 1,
                SummaryEvent: '2nd down and 2 at ET 14',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for 11 yards to ET 3. FIRST DOWN.'
              },
              9: {
                TimeLeft: '9:50 left in 2nd Quarter.',
                RedZone: 1,
                SummaryEvent: '1st down and G at ET 3',
                SummaryType: 'Run',
                SummaryDescription: 'Willie Roberts rush for 3 yards to ET 0. TOUCHDOWN. (Nick Rodriguez PAT KICK GOOD.)'
              }
            }
          },
          2: {
            TeamName: 'Euless Trinity',
            ScoreChange: false,
            AwayScorePrev: '14',
            HomeScorePrev: '7',
            AwayScoreCurr: '14',
            HomeScoreCurr: '7',
            Records: {
              1: {
                SummaryEvent: '',
                SummaryType: 'Penalty Defense',
                SummaryDescription: 'AM penalized 5 yards.'
              },
              2: {
                TimeLeft: '9:43 left in 2nd Quarter.',
                SummaryEvent: '',
                SummaryType: 'Kickoff Return',
                SummaryDescription: 'Marcus Ervin returns kick 13 yards.'
              },
              3: {
                SummaryEvent: '1st down and 10 at ET 26',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 10 yards to ET 36. FIRST DOWN.'
              },
              4: {
                SummaryEvent: '1st down and 10 at ET 36',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 8 yards to ET 44.'
              },
              5: {
                SummaryEvent: '2nd down and 2 at ET 44',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 6 yards to  50. FIRST DOWN.'
              },
              6: {
                SummaryEvent: '1st down and 10 at AM 50',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 3 yards to AM 47.'
              },
              7: {
                SummaryEvent: '2nd down and 7 at AM 47',
                SummaryType: 'Run',
                SummaryDescription: 'AJ Barnett rush for 5 yards to AM 42.'
              },
              8: {
                SummaryEvent: '3rd down and 2 at AM 42',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 4 yards to AM 38. FIRST DOWN.'
              },
              9: {
                TimeLeft: '6:45 left in 2nd Quarter.',
                SummaryEvent: '1st down and 10 at AM 38',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for 0 yards to AM 38.FUMBLE LOST.'
              }
            }
          },
          3: {
            TeamName: 'Arlington Martin',
            ScoreChange: false,
            AwayScorePrev: '14',
            HomeScorePrev: '7',
            AwayScoreCurr: '14',
            HomeScoreCurr: '7',
            Records: {
              1: {
                SummaryEvent: '1st down and 10 at AM 34',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for 3 yards to AM 37.'
              },
              2: {
                TimeLeft: '6:31 left in 2nd Quarter.',
                SummaryEvent: '2nd down and 7 at AM 37',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Zach Mundell pass incomplete.'
              },
              3: {
                SummaryEvent: '3rd down and 7 at AM 37',
                SummaryType: 'Pass',
                SummaryDescription: 'Zach Mundell pass complete to Jonathan Carter for 11 yards to AM 48. FIRST DOWN.'
              },
              4: {
                SummaryEvent: '1st down and 10 at AM 48',
                SummaryType: 'Run',
                SummaryDescription: 'Montrell Smith rush for 7 yards to ET 45.'
              },
              5: {
                TimeLeft: '5:01 left in 2nd Quarter.',
                SummaryEvent: '2nd down and 3 at ET 45',
                SummaryType: 'Run',
                SummaryDescription: 'Zach Mundell rush for 15 yards to ET 30. FIRST DOWN.'
              },
              6: {
                SummaryEvent: '1st down and 10 at ET 30',
                SummaryType: 'Run',
                SummaryDescription: 'Montrell Smith rush for 1 yards to ET 29.'
              },
              7: {
                TimeLeft: '4:14 left in 2nd Quarter.',
                SummaryEvent: '2nd down and 9 at ET 29',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Zach Mundell pass incomplete.'
              },
              8: {
                TimeLeft: '4:12 left in 2nd Quarter.',
                SummaryEvent: '3rd down and 9 at ET 29',
                SummaryType: 'Incomplete Pass',
                SummaryDescription: 'Zach Mundell pass incomplete.'
              },
              9: {
                TimeLeft: '4:11 left in 2nd Quarter.',
                SummaryEvent: '',
                SummaryType: 'Timeout',
                SummaryDescription: 'Timeout.'
              },
              10: {
                TimeLeft: '4:11 left in 2nd Quarter.',
                SummaryEvent: '',
                SummaryType: 'Timeout',
                SummaryDescription: 'Timeout.'
              },
              11: {
                TimeLeft: '4:00 left in 2nd Quarter.',
                SummaryEvent: '4th down and 9 at ET 29',
                SummaryType: 'Field Goal',
                SummaryDescription: '  46-yard field goal. MISSED'
              }
            }
          },
          4: {
            TeamName: 'Euless Trinity',
            ScoreChange: true,
            AwayScorePrev: '14',
            HomeScorePrev: '7',
            AwayScoreCurr: 0,
            HomeScoreCurr: 0,
            Records: {
              1: {
                SummaryEvent: '1st down and 10 at ET 29',
                SummaryType: 'Run',
                SummaryDescription: 'Brandon Theus rush for -3 yards to ET 26.'
              },
              2: {
                SummaryEvent: '',
                SummaryType: '',
                SummaryDescription: ''
              }
            }
          }
        }
      }
    }
  },
  away: {
    id: '884',
    name: 'Arlington Martin',
    teamCode: 'AM',
    boxscore: [7, 7, 0, 0, 0, 0, 0, 0],
    teamStats: {
      TotalYards: '201',
      FirstDowns: '9',
      RushingAttempts: '14',
      RushingYards: '125',
      PassCompletions: '6',
      PassAttempts: '11',
      PassingInterceptions: '0',
      PassingYards: '76',
      PassCompletionPercentage: 54.55,
      Punts: '1',
      PuntingYards: '38',
      PuntingAverage: '38',
      Fumbles: '0',
      FumblesLost: '0',
      Penalties: '3',
      PenaltyYards: '30',
      AverageRush: 8.93
    },
    playerStats: {
      Rushing: [{
        PlayerID: '785',
        PlayerFirstName: 'Willie',
        PlayerLastName: 'Roberts',
        PlayerNumber: '3',
        RushingAttempts: '3',
        RushingYards: '65',
        RushingYardsPerAttempt: '21.67',
        RushingTouchdowns: '2'
      }, {
        PlayerID: '804',
        PlayerFirstName: 'Zach',
        PlayerLastName: 'Mundell',
        PlayerNumber: '21',
        RushingAttempts: '6',
        RushingYards: '42',
        RushingYardsPerAttempt: '7.00',
        RushingTouchdowns: '0'
      }, {
        PlayerID: '795',
        PlayerFirstName: 'Montrell',
        PlayerLastName: 'Smith',
        PlayerNumber: '13',
        RushingAttempts: '5',
        RushingYards: '18',
        RushingYardsPerAttempt: '3.60',
        RushingTouchdowns: '0'
      }],
      Passing: [{
        PlayerID: '804',
        PlayerFirstName: 'Zach',
        PlayerLastName: 'Mundell',
        PlayerNumber: '21',
        PassCompletions: '6',
        PassAttempts: '11',
        PassCompletionPercentage: 54.55,
        PassingYards: '76',
        PassingTouchdowns: '0',
        PassingInterceptions: '0'
      }],
      Receiving: [{
        PlayerID: '835',
        PlayerFirstName: 'Jonathan',
        PlayerLastName: 'Carter',
        PlayerNumber: '88',
        Receptions: '3',
        ReceivingYards: '42',
        YardsPerCatch: '14.0',
        ReceivingTouchdowns: '0'
      }, {
        PlayerID: '785',
        PlayerFirstName: 'Willie',
        PlayerLastName: 'Roberts',
        PlayerNumber: '3',
        Receptions: '1',
        ReceivingYards: '18',
        YardsPerCatch: '18.0',
        ReceivingTouchdowns: '0'
      }, {
        PlayerID: '794',
        PlayerFirstName: 'KJ',
        PlayerLastName: 'Polk',
        PlayerNumber: '12',
        Receptions: '1',
        ReceivingYards: '8',
        YardsPerCatch: '8.0',
        ReceivingTouchdowns: '0'
      }, {
        PlayerID: '793',
        PlayerFirstName: 'Alonzo',
        PlayerLastName: 'Banks',
        PlayerNumber: '11',
        Receptions: '1',
        ReceivingYards: '8',
        YardsPerCatch: '8.0',
        ReceivingTouchdowns: '0'
      }]
    }
  },
  home: {
    id: '1498',
    name: 'Euless Trinity',
    teamCode: 'ET',
    boxscore: [7, 0, 0, 0, 0, 0, 0, 0],
    teamStats: {
      TotalYards: '134',
      FirstDowns: '6',
      RushingAttempts: '22',
      RushingYards: '126',
      PassCompletions: '1',
      PassAttempts: '2',
      PassingInterceptions: '0',
      PassingYards: '8',
      PassCompletionPercentage: 50,
      Punts: '2',
      PuntingYards: '39',
      PuntingAverage: '19.5',
      Fumbles: '1',
      FumblesLost: '1',
      Penalties: '1',
      PenaltyYards: '10',
      AverageRush: 5.73
    },
    playerStats: {
      Rushing: [{
        PlayerID: '8534',
        PlayerFirstName: 'Brandon',
        PlayerLastName: 'Theus',
        PlayerNumber: '3',
        RushingAttempts: '18',
        RushingYards: '119',
        RushingYardsPerAttempt: '6.61',
        RushingTouchdowns: '1'
      }, {
        PlayerID: '8550',
        PlayerFirstName: 'AJ',
        PlayerLastName: 'Barnett',
        PlayerNumber: '20',
        RushingAttempts: '1',
        RushingYards: '5',
        RushingYardsPerAttempt: '5.00',
        RushingTouchdowns: '0'
      }, {
        PlayerID: '8538',
        PlayerFirstName: 'Laki',
        PlayerLastName: 'Ellis',
        PlayerNumber: '7',
        RushingAttempts: '2',
        RushingYards: '2',
        RushingYardsPerAttempt: '1.00',
        RushingTouchdowns: '0'
      }, {
        PlayerID: '8544',
        PlayerFirstName: 'Isaac',
        PlayerLastName: 'Fakailoatanga',
        PlayerNumber: '13',
        RushingAttempts: '1',
        RushingYards: '0',
        RushingYardsPerAttempt: '0.00',
        RushingTouchdowns: '0'
      }],
      Passing: [{
        PlayerID: '8538',
        PlayerFirstName: 'Laki',
        PlayerLastName: 'Ellis',
        PlayerNumber: '7',
        PassCompletions: '1',
        PassAttempts: '2',
        PassCompletionPercentage: 50,
        PassingYards: '8',
        PassingTouchdowns: '0',
        PassingInterceptions: '0'
      }],
      Receiving: [{
        PlayerID: '8549',
        PlayerFirstName: 'Keanu',
        PlayerLastName: 'Hill',
        PlayerNumber: '18',
        Receptions: '1',
        ReceivingYards: '8',
        YardsPerCatch: '8.0',
        ReceivingTouchdowns: '0'
      }]
    }
  }
};
exports.scoreUpdate = scoreUpdate;