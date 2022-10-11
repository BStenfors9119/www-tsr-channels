import axios from 'axios';

export const load = () => {
  return new Promise((res, rej) => {
    axios.get('https://api.thesportsremote.com/api/teams')
      .then(resp => {
        console.log('resp');
        console.log(resp);

        let teams = resp.data;

        res(teams);
      })
  })
}

export const loadSchedules = () => {
  return new Promise((res, rej) => {
    axios.get('https://api.thesportsremote.com/api/schedules')
      .then(resp => {
        console.log('resp');
        console.log(resp);

        let schedules = resp.data;

        res(schedules);
      })
  })
}
