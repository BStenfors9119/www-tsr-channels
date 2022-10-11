<script>
    import { getContext, createEventDispatcher } from 'svelte';
    import Config from '../../config';
    import { form, field } from 'svelte-forms';
    import { required } from 'svelte-forms/validators';
    import Card from '../components/Card.svelte';
    import { initializeApp } from 'firebase/app';
    import firebase from 'firebase/compat/app';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

    const dispatch = createEventDispatcher();
    const app = initializeApp(Config());
    const auth = getAuth(app);

    export let fbApp = null;

    let buttonColor = '#1A3662';

    const username = field('username', '', [required()]);
    const password = field('password', '', [required()]);
    const loginForm = form(username, password);

    const handleLogin = (ev) => {
        console.log('handling login submit');
        console.log(ev);

        console.log(loginForm.summary());
        const creds = loginForm.summary();

        signInWithEmailAndPassword(auth, creds.username, creds.password)
          .then(resp => {
            console.log('resp');
            console.log(resp);
            if(resp.user !== undefined) {
              window.localStorage.setItem('user', JSON.stringify(resp.user));
              // console.log(getContext('user'));
              dispatch('successfulLogin', {
                user: resp.user
              })
            }
          })
  }
</script>

<div class="container">
    <Card
            cardWidth='500px'
            titleSize="20px"
            title="Log In"
            titleColor="#A6A6A6">
        <svelte:fragment slot="children">
            <section class="login-form">
                <div>
                    <label>Username</label><br />
                    <input type="text" bind:value={$username.value} />
                </div>
                <div>
                    <label>Password</label><br />
                    <input type="password" bind:value={$password.value} />
                </div>
            </section>
        </svelte:fragment>
        <svelte:fragment slot="actions">
            <div class="action">
                <button on:click={handleLogin}>LogIn</button>
            </div>
            <div class="action">
                <button>Cancel</button>
            </div>
        </svelte:fragment>
    </Card>
</div>

<style>
    @media screen and (min-width: 1081px) and (max-width: 2560px)  {
        button {
            width: 125px;
            height: 50px;
            border-radius: 10px;
            background-color: var(--buttonColor);
            color: white;
        }

        button.large {
            width: 250px;
        }

        input {
            border-radius: 7px;
            height: 45px;
        }

        input:focus {
            border: solid 1px #0E264A;
        }

        .container {
            margin: 0 auto;
            position: relative;
            width: 90vw;
            min-width: 50vw;
        }

        .login-form {
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 0px) and (max-width: 1080px) {
        button {
            width: 125px;
            height: 50px;
            border-radius: 10px;
            background-color: var(--buttonColor);
            color: white;
        }

        button.large {
            width: 250px;
        }

        input {
            border-radius: 7px;
            height: 45px;
        }

        input:focus {
            border: solid 1px #0E264A;
        }

        .container {
            margin: 0 auto;
            width: 70vw;
        }

        .login-form {
            margin: 0 auto;
        }
    }
</style>
