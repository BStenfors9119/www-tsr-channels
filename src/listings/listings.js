import axios from 'axios';
import _ from 'underscore';
import moment from 'moment-timezone';
import {useScores} from "../data/scores";
import {convertToCurrentTzTime} from "../shared/tsr-time";

export const load = (lineupId) => {
    const {  loadNflScores,
        loadMlbScores,
        loadNbaScores,
        loadNhlScores,
        loadNcaafScores,
        loadNcaabScores,
        loadSoccerScores } = useScores();
    return new Promise((res, rej) => {

        let multiDayListings = [];

        let nflScorePromise = loadNflScores();
        let nbaScoresPromise = loadNbaScores();
        let mlbScoresPromise = loadMlbScores();
        let nhlScoresPromise = loadNhlScores();
        let ncaafScoresPromise =  loadNcaafScores();
        let ncaabScoresPromise =  loadNcaabScores();
        let uefaScoresPromise = loadSoccerScores('uefa.champions');
        let eplScoresPromise = loadSoccerScores('eng.1');
        let bundScoresPromise = loadSoccerScores('ger.1');
        let laligaScoresPromise = loadSoccerScores('arg.copa_lpf');
        let mlsScoresPromise = loadSoccerScores('usa.1');

          Promise.all([nflScorePromise, nbaScoresPromise, mlbScoresPromise, nhlScoresPromise,
              ncaafScoresPromise, ncaabScoresPromise,
              uefaScoresPromise,eplScoresPromise, bundScoresPromise, laligaScoresPromise, mlsScoresPromise])
            .then(async (scores) => {
                console.log(scores);

                let allScores = [];

                scores.forEach((leagueScores) => {
                    allScores.push(...leagueScores.data.events);
                });

                multiDayListings = await axios.post('https://us-central1-the-sports-remote-272021.cloudfunctions.net/games-for-lineup-id-packages-with-caching', {
                    lineupId: lineupId,
                    packages: []
                })

                console.log('multi day listings');
                console.log(multiDayListings.length);

                let games = multiDayListings.data[0].games;

                let defaultListings = [];
                let finalListings = [];

                let groupedByMatchup = _.groupBy(games, "matchup");
                let finalGroupedByMatchup = _.map(groupedByMatchup, (matchup) => {
                    let providers = _.groupBy(matchup, "provider");

                    let finalProviders = _.map(providers, (provider) => {
                        let providerChannels = _.uniq(_.pluck(_.flatten(provider), "channel"));

                        let finalProviderChannels = [];

                        providerChannels.forEach(pc => {
                            let callsign = _.where(provider, {"channel": pc})


                            finalProviderChannels.push({
                                channel: pc,
                                callsign: callsign[0].callsign,
                                network: callsign[0].network
                            })

                        })

                        return {
                            provider: provider[0].provider,
                            channels: finalProviderChannels
                        }
                    });

                    let matchupTeamInfo = matchup[0].matchup.split(' at ');

                    // if(matchup[0].league === 'NCAA') {
                    //     console.log('matchup team info');
                    //     console.log(matchupTeamInfo);
                    // }

                    let scoreInfo = allScores.filter(s => {
                        let awayTeamName = matchupTeamInfo[0];
                        let homeTeamName = matchupTeamInfo[1];

                        let convertedTeamNames =  processNameConversions(awayTeamName, homeTeamName);

                        if (s.name.toString().includes(convertedTeamNames.awayTeamName) && s.name.toString().includes(convertedTeamNames.homeTeamName)) {
                            return s;
                        }
                    });
                    let game = matchup[0];
                    let teamOneScore = scoreInfo !== undefined && scoreInfo.length > 0 ? scoreInfo[0].competitions[0].competitors[1].score : '';
                    let teamOneLogo = scoreInfo !== undefined && scoreInfo.length > 0 ? scoreInfo[0].competitions[0].competitors[1].team.logo : '';
                    let teamTwoScore = scoreInfo !== undefined && scoreInfo.length > 0 ? scoreInfo[0].competitions[0].competitors[0].score : '';
                    let teamTwoLogo = scoreInfo !== undefined && scoreInfo.length > 0 ? scoreInfo[0].competitions[0].competitors[0].team.logo : '';
                    let gameStatus = scoreInfo !== undefined && scoreInfo.length > 0 ? scoreInfo[0].competitions[0].status.type.detail : '';

                    let gameStarted = moment(`${game.gameDate} ${game.start}`).isAfter(moment());
                    return {
                        conference: matchup[0].conference,
                        league: matchup[0].league,
                        matchup: matchup[0].matchup,
                        gameId: matchup[0].gameId,
                        start: matchup[0].startTime,
                        gameDate: matchup[0].gameDate,
                        schoolId: matchup[0].schoolId,
                        sportId: matchup[0].sportId,
                        gameStarted: gameStarted,
                        teamOne: matchupTeamInfo.teamOne,
                        teamTwo: matchupTeamInfo.teamTwo,
                        teamOneMascot: matchupTeamInfo.teamOneMascot,
                        teamTwoMascot: matchupTeamInfo.teamTwoMascot,
                        teamOneScore: teamOneScore,
                        teamTwoScore: teamTwoScore,
                        teamOneLogo: teamOneLogo,
                        teamTwoLogo: teamTwoLogo,
                        timeAndPeriod: gameStatus,
                        scoreInfo: {
                            teamOneScore: teamOneScore,
                            teamTwoScore: teamTwoScore,
                            timeAndPeriod: gameStatus
                        },
                        controllers: [],
                        providers: finalProviders
                    }
                });

                finalListings = _.map(finalGroupedByMatchup, (game) => {
                    let leagueName = game.league;
                    let date = new Date();
                    let adjustedGameStartTime = convertToCurrentTzTime(game.start, date.getTimezoneOffset().toString());
                    game["start"] = adjustedGameStartTime;
                    let sorterDateTime = `${game.gameDate} ${game.start}`;
                    let gameStatus = game["scoreInfo"]["timeAndPeriod"];
                    if (gameStatus.includes(' at ')){
                        let atIdx = gameStatus.indexOf(' at');
                        let adjustedGameStatus = `${gameStatus.substring(0, atIdx)} at ${game.start.toString().toUpperCase()}`
                        game["scoreInfo"]["timeAndPeriod"] = adjustedGameStatus;
                    } else if (gameStatus === 'FT'){
                        game["scoreInfo"]["timeAndPeriod"] = "FINAL";
                    }
                    return {
                        sorter: moment(sorterDateTime).format('MM/DD/YYYY hh:mm a'),
                        game: game,
                        gameStatus: game["timeAndPeriod"],
                        name: game.start
                    }
                })

                finalListings = finalListings.map(v => Object.assign({}, v, {sorter: new Date(v.sorter)}))
                    .sort((a, b) => a.sorter - b.sorter);

                const fieldSorter = (fields) => (a, b) => fields.map(o => {
                    let dir = 1;
                    let field = o;


                    if (o.substring(0, 1) === '-') { dir = -1; field=o.substring(1); }

                    // let fieldArray = field.split('.');
                    let comparerOne = a[field];
                    let comparerTwo = b[field];

                    return comparerOne > comparerTwo ? dir : comparerOne < comparerTwo ? -(dir) : 0;
                }).reduce((p, n) => p ? p : n, 0);

                const sortedFinalListings = finalListings.sort(fieldSorter(['-gameStarted']));

                console.log('sorted final listings');
                console.log(sortedFinalListings);

                res(sortedFinalListings);
            })
    })
  }

const processNameConversions = (awayTeamName, homeTeamName) => {
    let convertedTeamNames = {
        awayTeamName: awayTeamName,
        homeTeamName: homeTeamName
    }
    let nameMappings = [
        {
            tsrName: 'Washington',
            scoresName: 'Washington'
        },
        {
            tsrName: 'Loyola Chi.',
            scoresName: 'Loyola Chicago'
        },
        {
            tsrName: 'North Carolina State',
            scoresName: 'NC State'
        },
        {
            tsrName: 'Maryland (College Park)',
            scoresName: 'Maryland'
        },
        {
            tsrName: 'North Carolina (Chapel Hill)',
            scoresName: 'North Carolina'
        },
        {
            tsrName: 'University of Wisconsin-Green Bay',
            scoresName: 'Green Bay Phoenix'
        }
    ]


    nameMappings.forEach(mapping => {
        if(awayTeamName !== undefined && awayTeamName.includes(mapping.tsrName)) {
            convertedTeamNames.awayTeamName = mapping.scoresName;
        }

        if(homeTeamName !== undefined && homeTeamName.includes(mapping.tsrName)) {
            convertedTeamNames.homeTeamName = mapping.scoresName;
        }
    })


    return convertedTeamNames;
}
