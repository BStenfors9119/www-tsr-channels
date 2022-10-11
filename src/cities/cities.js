import axios from 'axios';

export const load = () => {
  return new Promise((res, rej) => {
    axios.get('https://api.thesportsremote.com/api/cities')
      .then(resp => {
        console.log('resp');
        console.log(resp);

        let cities = resp.data;

        res(cities);
      })
  })
  }
