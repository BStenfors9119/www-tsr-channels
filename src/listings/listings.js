import axios from 'axios';
import _ from 'underscore';
import moment from 'moment-timezone';
import {useScores} from "../data/scores";
import {convertToCurrentTzTime} from "../shared/tsr-time";

export const load = (lineupId) => {
    return new Promise(async (res, rej) => {
        let date = new Date();
        let tzOffset = date.getTimezoneOffset().toString();

        console.log('tz offset');
        console.log(tzOffset);

        const forecastResp = await axios.get(`https://api.thesportsremote.com/api/games/forecast/${lineupId}/${tzOffset}`)

        console.log('games');
        console.log(forecastResp);
        console.log(forecastResp.data.games);

        res(forecastResp.data.games);
    })
  }
