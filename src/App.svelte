<script xmlns:svelte="http://www.w3.org/1999/html">
  import {createEventDispatcher, onMount, setContext} from 'svelte';
  import {FaBuilding} from 'svelte-icons/fa';
  import { cssVariables } from "./dynamic-css-vars";

  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Clients from './clients/clients.svelte';
  import Locations from './locations/locations.svelte';
  import Providers from './providers/providers.svelte';
  import Listings from './listings/listings.svelte';

  import { load } from './listings/listings';

  let listHeight = window.innerHeight * .4;
  let bodyColor = '#E9E9E9';
  let buttonColor = '#1A3662';
  let showBorders = false;
  let zip = '';
  let validZip = false;

  let promise = null;
  $: currentUser = null;
  let selectedNav = "0";
  let navClicked = null;
  let listings = [];
  let cities = [];
  let teamSchedules = [];
  let locations = [];
  let cardChildren = [];
  let navIcons = [
    {
      label: 'Clients',
      onClick: 'handleLoadingClients',
      icon: FaBuilding
    },
    {
      label: 'Locations',
      onClick: 'handleLoadingLocations',
      icon: FaBuilding
    }
  ]

  const onProviderSelected = cev => {
		console.log('on provider selected');
        console.log(cev.detail.selectedProvider);
        zip = '';
        const selectedProvider = cev.detail.selectedProvider;
       load(selectedProvider.lineup_id)
           .then(resp => {
               listings = resp;
           })
}

</script>

<div class="main"
    use:cssVariables={{buttonColor, bodyColor, listHeight}}>
    <div class="bg-wrapper">
        <img class="bg-img" src="/images/social-1200.png" alt="TheSportsRemote.com"/>
    </div>
    <div class="container">
        <div class="inner-container">
            <p class="instructions">
                This is designed to help you find the channel to your game for the exact city you're currently in and
                cable provider you're using.
            </p>
        </div>
        <div class="inner-container">
            <label class="sub-title">STEP 1: </label>
        </div>
        <div class="inner-container">
            <input bind:value={zip} placeholder="Enter Zip Code" />
        </div>
        {#if (!isNaN(zip) && zip.length === 5) || (isNaN(zip) && zip.length >= 3)}
            <div class="inner-container">
                <label class="sub-title">STEP 2 (Select a Provider):</label>
            </div>
            <div class="inner-container-list">
                <Providers
                    zip={zip}
                    containerHeight={listHeight}
                    on:providerSelected={onProviderSelected}
                />
            </div>
        {/if}

        {#if listings.length > 0}
            <div class="listings-container">
                <Listings
                    listings={listings}
                    containerHeight={listHeight}
                />
            </div>
        {/if}
    </div>
</div>

<style>
    @media screen and (min-width: 1081px) and (max-width: 2560px) {
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
            border-radius: 10px;
            width: 350px;
            height: 75px;
            font-size: 18pt;
            font-weight: bold;
            color: #999999;
            border-color: #999999;
            font-family: "DejaVu Sans Mono", serif;
        }
        .bg-wrapper {
            position: absolute;
            left: 35%;
            top: 35%;
        }
        .bg-img {
            opacity: .15;
            width: 60%;
            height: 60%;
        }
        .bold-title-letter {
            color: darkgreen;
        }
        .main {
            left: 0px;
            top: 0px;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000000;
        }
        .container {
            /*margin: 0 auto;*/
            z-index: 10;
            position: relative;
            justify-items: flex-start;
        }
        .inner-container {
            padding: 10px;
            width: 50%;
            margin: 0 auto;
        }
        .inner-container-list {
            max-height: var(--listHeight)px;
            overflow: auto;
        }
        .instructions {
            font-size: 18pt;
            color: #999999;
            font-family: "DejaVu Sans Mono", serif;
        }
        .listings-container {
            width: 100%;
        }
        .sub-title {
            flex: auto;
            font-weight: bold;
            color: #999999;
            font-size: 1.75em;
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
            border-radius: 10px;
            width: 350px;
            height: 75px;
            font-size: 18pt;
            font-weight: bold;
            color: #999999;
            border-color: #999999;
            font-family: "DejaVu Sans Mono", serif;
        }
        .bg-wrapper {
            position: absolute;
            left: 25%;
            top: 35%;
        }
        .bg-img {
            opacity: .15;
            width: 60%;
            height: 60%;
        }
        .bold-title-letter {
            color: darkgreen;
        }
        .main {
            left: 0px;
            top: 0px;
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000000;
        }
        .container {
            /*margin: 0 auto;*/
            z-index: 10;
            position: relative;
            justify-items: flex-start;
        }
        .inner-container {
            padding: 10px;
            margin: 0 auto;
        }
        .inner-container-list {
            max-height: var(--listHeight)px;
            overflow: scroll;
        }
        .instructions {
            font-size: 18pt;
            color: #999999;
            font-family: "DejaVu Sans Mono", serif;
        }
        .listings-container {
            max-height: var(--listHeight)px;
            overflow: scroll;
        }
        .sub-title {
            flex: auto;
            font-weight: bold;
            color: #999999;
            font-size: 1.75em;
        }
    }

    .color-primary-0 { color: #304C78 }	/* Main Primary color */
    .color-primary-1 { color: #798EB0 }
    .color-primary-2 { color: #4E6892 }
    .color-primary-3 { color: #1A3662 }
    .color-primary-4 { color: #082045 }

    .color-primary-5 { color: #B1B2B4 }	/* Main Primary color */
    .color-primary-6 { color: #FFFFFF }
    .color-primary-7 { color: #3C7EE8 }
    .color-primary-8 { color: #A6A6A6 }
    .color-primary-9 { color: #0E264A }
</style>
