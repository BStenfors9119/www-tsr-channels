import axios from 'axios';

export const load = () => {
  return new Promise((res, rej) => {
    axios.get('https://api.thesportsremote.com/api/locations')
      .then(resp => {
        let locations = resp.data;

        res(locations);
      })
  })
}
