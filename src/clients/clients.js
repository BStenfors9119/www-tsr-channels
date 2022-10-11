import axios from 'axios';

export const load = () => {
  return new Promise((res, rej) => {
    axios.get('https://api.thesportsremote.com/api/clients')
      .then(resp => {
        let clients = resp.data;

        res(clients);
      })
  })
}
