<script>
    import {onMount} from 'svelte';
    import {load} from './clients';
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';

    let clients = [];

    onMount(() => {
        load()
          .then(clientsResp => {
            clients = clientsResp;
          })
    })

    const handleClientClicked = (client) => {
      console.log('client selected');
      console.log(client);
    }
</script>

<div class="container"
     use:cssVariables={{buttonColor, bodyColor}}>
    <div class="inner-container">
        {#each clients as client, idx}
            <Card
                    title={`${client.name} (${client.id})`}
                    titleColor="#A6A6A6"
                    on:clicked={() =>
                    {
                      console.log('clicked');
                      handleClientClicked(client)
                    }}>
                <svelte:fragment slot="children">

                </svelte:fragment>
            </Card>
        {/each}
    </div>
</div>

<style>
    @media screen and (min-width: 1081px) and (max-width: 2560px) {
        .container {
            width: 100vw;
            display: inline-flex;
            flex-direction: row;
            justify-content: flex-start;
            justify-items: flex-start;
            border: solid 1px red;
        }

        .inner-container {
            flex-direction: column;
            width: 100vw;
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
        .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-items: flex-start;
            overflow-x: hidden;
            overflow-y: scroll;
        }
        .inner-container {
            padding: 5px;
            width: 85vw;
        }
    }
</style>
