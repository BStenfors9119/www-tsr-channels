<script>
    import {onMount} from 'svelte';
    import {load} from './locations';
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';

    export let locations = [];

    onMount(() => {
        load()
          .then(locationsResp => {
            locations = locationsResp;
          })
    })

    const handleLocationClicked = (location) => {
      console.log('location selected');
      console.log(location);
    }
</script>

<div class="container"
     use:cssVariables={{buttonColor, bodyColor}}>
    <div class="inner-container">
    {#each locations as location, idx}
        <Card
                title={`${location.name} (${location.id})`}
                titleColor="#A6A6A6"
                on:clicked={() =>
                {
                  console.log('clicked');
                  handleLocationClicked(location)
                }}>
            <svelte:fragment slot="children">

            </svelte:fragment>
        </Card>
    {/each}
    </div>
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
        .main {
            left: 0px;
            top: 0px;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: var(--bodyColor);
        }
        .action {
            padding: 3px;
        }
        .container {
            margin: 0 auto;
            width: 100%;
            min-width: 1200px;
        }
        .inner-container {

            padding: 5px;
            width: 50%;
            margin: 0 auto;
            margin-top: 15px;
            flex-direction: column;
            justify-content: center;
            justify-items: center;
            display: flex;
            box-shadow: 5px 10px 8px #999999;
            border-radius: 6px;
        }
        .icon-bar-container {
            padding: 3px;
            flex: 12;
            flex-direction: row;
        }
        .title {
            flex: auto;
            font-weight: bold;
            color: #999999;
        }
        .mobile-nav {
            display: none;
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
            width: 100%;
            height: 100%;
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
