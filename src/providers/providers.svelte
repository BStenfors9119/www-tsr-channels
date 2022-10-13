<script>
    import {onMount} from 'svelte';
    import {load} from './providers';
    import { createEventDispatcher } from 'svelte';
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';

    const dispatch = createEventDispatcher();

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';

    export let zip = null;
    export let providers = [];
    export let containerHeight = window.innerHeight * .85;

    onMount(() => {
        load(zip)
          .then(providersResp => {
            providers = providersResp;
          })
    })

    const providerSelected = provider => {
        console.log('provider selected');

        dispatch('providerSelected', {
                selectedProvider: provider
        })
    }
</script>

<div class="container" style="max-height: {containerHeight}px;"
     use:cssVariables={{buttonColor, bodyColor, containerHeight}}>
    {#each providers as provider, idx}
        <Card
            title={`${provider.name}`}
            titleColor="#A6A6A6"
            cardWidth={'20vw'}
            showActions={false}
            on:clicked={(ev) => {
               providerSelected(provider);
            }}
        >
            <svelte:fragment slot="children">
                <div class="select-button">
                    <label>SELECT</label>
                </div>
            </svelte:fragment>
        </Card>
    {/each}
</div>

<style>
    @media screen and (min-width: 1081px) and (max-width: 2560px) {
        html, body {
            margin: 0;
            height: 100vh;
            background-color: var(--bodyColor);
        }
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
            text-align: center;
            margin: 0 auto;
            width: 100%;
            overflow: auto;
            cursor: pointer;
        }
        .select-button {
            border-radius: 0px 0px 10px 10px;
            text-align: center;
            font-size: 25pt;
            width: 100%;
            background-color: #999999;
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
            text-align: center;
            margin: 0 auto;
            overflow: scroll;
            cursor: pointer;
        }
        .select-button {
            border-radius: 0px 0px 10px 10px;
            text-align: center;
            font-size: 25pt;
            width: 100%;
            background-color: #999999;
        }

    }
</style>
