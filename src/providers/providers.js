import axios from 'axios';

export const load = (zip) => {
  return new Promise((res, rej) => {
    axios.get(`https://api.thesportsremote.com/api/cities/zip/${zip}/city/abc`).then(resp => {
        let providerInfo = resp.data;

        res(providerInfo);
      })
  })
  }
