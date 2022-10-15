import axios from 'axios';

export const load = (providerInfo) => {
    return new Promise(async (res, rej) => {
        let date = new Date();
        let tzOffset = date.getTimezoneOffset().toString();
        providerInfo['tzOffset'] = tzOffset;
        const forecastResp = await axios.post(`https://api.thesportsremote.com/api/games/forecast`, {
            forecastInfo: providerInfo
        })

        res(forecastResp.data.games);
    })
  }
