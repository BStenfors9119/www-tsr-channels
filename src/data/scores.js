import axios from 'axios';
import moment from 'moment';

export function useScores() {
    const loadNflScores = async () => {
            let today = moment().format("YYYYMMDD");
            let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?calendar=blacklist&dates=${today}`);

            return scores;

    }

    const loadMlbScores = async () => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?calendar=blacklist&dates=${today}`);

        return scores;
    }

    const loadNbaScores = async () => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?calendar=blacklist&dates=${today}`);

        return scores;
    }

    const loadNhlScores = async () => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?calendar=blacklist&dates=${today}`);

        return scores;
    }

    const loadNcaafScores = async () => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?calendar=blacklist&dates=${today}&limit=400`);

        return scores;
    }

    const loadNcaabScores = async () => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?calendar=blacklist&dates=${today}&limit=100&groups=50`);

        return scores;
    }

    const loadSoccerScores = async (league) => {
        let today = moment().format("YYYYMMDD");
        let scores = axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`);

        return scores;
    }

    return {
        loadNflScores,
        loadMlbScores,
        loadNbaScores,
        loadNhlScores,
        loadNcaafScores,
        loadNcaabScores,
        loadSoccerScores
    }
}
