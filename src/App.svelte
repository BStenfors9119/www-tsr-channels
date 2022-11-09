<script xmlns:svelte="http://www.w3.org/1999/html">
    import Routes from './routes.svelte';
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
  import {FaBuilding} from 'svelte-icons/fa';
  import { cssVariables } from "./dynamic-css-vars";

  import Header from './components/Header.svelte';
  import Providers from './providers/providers.svelte';
  import Listings from './listings/listings.svelte';
  import GameInfo from './gameInfo/gameInfo.svelte';

  import { load } from './listings/listings';

  let listHeight = window.innerHeight * .8;
  let bodyColor = '#E9E9E9';
  let buttonColor = '#1b7902';
  let showBorders = false;
  let zip = '';
  let validZip = false;

  $: selectedGameInfo = null;
  $: currentUser = null;
  $: listings = [];

  let gameSelected = false;
  let refreshing = false;
  let providerSelected = false;
  let promise = null;
  let selectedNav = "0";
  let navClicked = null;
  let selectedProvider = null;
  let selectedProviderCityInfo = null;
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
    let zipInput;

  const onProviderSelected = async cev => {
        zip = '';
        providerSelected = true;
        selectedProvider = cev.detail.selectedProvider;
        selectedProviderCityInfo = cev.detail.cityInfo;

      selectedProvider['importFolder'] = selectedProviderCityInfo['importFolder'];
      selectedProvider['cityImportFolder'] = selectedProviderCityInfo['importFolder'];
      selectedProviderCityInfo['provider'] = selectedProvider;
      selectedProviderCityInfo['cityId'] = selectedProvider.city_id;
      selectedProviderCityInfo['lineupId'] = selectedProvider.lineup_id;

      listings = await load(selectedProviderCityInfo);

  }

  const onGameSelected = async ev => {
      gameSelected = true;
      selectedGameInfo = ev.detail.selectedGame;
  }

  const onStartOver = () => {
      listings = [];
      providerSelected = false;
      zip = '';
  }

  const onRefresh = async () => {
      refreshing = true;
      listings = [];
      providerSelected = false;
      listings = await load(selectedProviderCityInfo);
      providerSelected = true;
      refreshing = false;
  }

  onMount(() => {
      zipInput.focus();
      (window.adsbygoogle = window.adsbygoogle || []).push({});
  })

</script>

<div class="main"
    use:cssVariables={{buttonColor, bodyColor, listHeight}}>
    <Routes />
    {#if (listings !== null && listings.length === 0 && providerSelected) || refreshing && !gameSelected}
        <div class="bg-wrapper" in:fade="{{duration: 2000}}" out:fade="{{duration: 2000}}">
            <img class="bg-img-full-opacity"
                 src="/images/social-1200.png"
                 alt="TheSportsRemote.com"/>
        </div>
    {:else if listings !== null && listings.length > 0 || !refreshing && !gameSelected}
        <div class="bg-wrapper" in:fade="{{duration: 2000}}" out:fade="{{duration: 2000}}">
            <img class="bg-img"
                 src="/images/social-1200.png"
                 alt="TheSportsRemote.com"/>
        </div>
    {:else}
        <div class="bg-wrapper">
            <img class="bg-img"
                 src="/images/social-1200.png"
                 alt="TheSportsRemote.com"/>
        </div>
    {/if}
        <Header dropShadowColor="#8ABD5F">
            <svelte:fragment slot="left-item" >

            </svelte:fragment>
            <svelte:fragment slot="center-item">
                <div class="mobile-market-buttons">
                    <div class="ios">
                        <a href='https://apps.apple.com/app/id1510651916'><img alt='Download at Apple iOS Market' src="/images/download-ios.svg"/></a>
                    </div>
                    <div class="android">
                        <a href='https://play.google.com/store/apps/details?id=com.sodapopsystems.social.tsr&hl=en_US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                           style={{bottom: 3, position: 'relative'}}>
                            <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' width="128"/>
                        </a>
                    </div>
                </div>
            </svelte:fragment>
            <svelte:fragment slot="right-item">

            </svelte:fragment>
    </Header>
    <div class="container">

        {#if providerSelected && (Array.isArray(listings) && listings.length === 0)}
            <div class="currently-importing-lineup">
                <p class="currently-importing-lineup-instructions">
                    Thank you for your support and choosing TheSportsRemote.
                </p>
                <p class="currently-importing-lineup-instructions">
                    If your listings do not show in the next few seconds chances are we are creating a fresh batch just for you!
                </p>
                <p class="currently-importing-lineup-instructions">
                    Please check back in a few minutes and they will be ready for your viewing.
                </p>
                <p class="currently-importing-lineup-instructions">
                    Don't forget to download the app from your phone's market up top!
                </p>
                <p class="currently-importing-lineup-instructions">
                    Thank you for your support!
                </p>
            </div>
        {/if}
        {#if listings === null}
            <div class="currently-importing-lineup">
                <p class="currently-importing-lineup-instructions">
                    Congratulations! You just added a new city / provider combination to TheSportsRemote's list!

                </p>
                <p class="currently-importing-lineup-instructions">
                    Please give the system 5 minutes to download your listings then check back.
                </p>
                <p class="currently-importing-lineup-instructions">
                    Don't forget to download the app from your phone's market up top!
                </p>
                <p class="currently-importing-lineup-instructions">
                    Thank you for your support!
                </p>
            </div>
        {/if}
        {#if ((!isNaN(zip) && zip.length < 5) || (isNaN(zip) && zip.length < 6))
            && !providerSelected && !refreshing}
            <div class="inner-container">
                <p class="instructions">
                    This is designed to help you find the channel to your game for the exact city you're currently in and
                    cable provider you're using.
                </p>
                <p class="instructions">
                    Don't forget to download the app from your phone's market up top!
                </p>
            </div>
            <div class="inner-container">
                <label class="sub-title">STEP 1: </label>
            </div>
            <div class="inner-container">
                <input
                    bind:value={zip} bind:this={zipInput} placeholder="Enter Zip Code" />
            </div>
        {/if}
        {#if (!isNaN(zip) && zip.length === 5) || (isNaN(zip) && zip.length >= 6) && !providerSelected}
            <div class="inner-container">
                <label class="sub-title">STEP 2 (Select a Provider):</label>
            </div>
            <div class="inner-container-list">
                <Providers
                    zip={zip}
                    on:providerSelected={onProviderSelected}
                />
            </div>
        {/if}

        {#if selectedGameInfo !== null}
            <div class="listings-container">
                <GameInfo gameInfo={selectedGameInfo} />
            </div>
        {/if}

        {#if listings !== null && listings.length > 0 && !gameSelected}
            <div class="listings-container">
                <div class="listings-toolbar">
                    <div class="listings-toolbar-left-item">
                        <button on:click={onStartOver} >Start Over</button>
                    </div>
                    <div class="listings-toolbar-right-item">
                        <button on:click={onRefresh} >Refresh</button>
                    </div>
                </div>
                <Listings
                    listings={listings}
                    on:gameSelected={onGameSelected}
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
        .bg-img-full-opacity {
            opacity: 1;
            width: 60%;
            height: 60%;
        }
        .currently-importing-lineup {
            width: 100%;
            display: inline-flex;
            flex-direction: column;
        }
        .currently-importing-lineup-instructions {
            width: 50%;
            margin: 0 auto;
            font-size: 18pt;
            color: #999999;
            font-family: "DejaVu Sans Mono", serif;
            padding: 10px;
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
        .listings-toolbar {
            display: flex;
            flex-direction: row;
        }
        .listings-toolbar-left-item {
            flex: 6;
            text-align: center;
            padding: 10px;
        }
        .listings-toolbar-right-item {
            flex: 6;
            text-align: center;
            padding: 10px;
        }
        .mobile-market-buttons {
            display: flex;
        }
        .mobile-market-buttons > .ios {
            flex: 6;
            text-align: right;
            justify-items: baseline;
            justify-content: flex-end;
        }
        .mobile-market-buttons > .android {
            flex: 6;
            justify-items: baseline;
            bottom: 10px;
            position: relative;
        }
        .mobile-market-buttons > .android > a > img {
            width: 145px;
            height: 60px;
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
        .bg-img-full-opacity {
            opacity: 1;
            width: 60%;
            height: 60%;
        }
        .currently-importing-lineup {
            width: 100%;
            display: inline-flex;
            flex-direction: column;
        }
        .currently-importing-lineup-instructions {
            width: 50%;
            margin: 0 auto;
            font-size: 18pt;
            color: #999999;
            font-family: "DejaVu Sans Mono", serif;
            padding: 10px;
        }
        .listings-toolbar {
            display: flex;
            flex-direction: row;
        }
        .listings-toolbar-left-item {
            flex: 6;
            text-align: center;
            padding: 10px;
        }
        .listings-toolbar-right-item {
            flex: 6;
            text-align: center;
            padding: 10px;
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
        .mobile-market-buttons {
            display: flex;
        }
        .mobile-market-buttons > .ios {
            flex: 6;
            text-align: right;
            justify-items: baseline;
            justify-content: flex-end;
        }
        .mobile-market-buttons > .android {
            flex: 6;
            justify-items: baseline;
            bottom: 10px;
            position: relative;
        }
        .mobile-market-buttons > .android > a > img {
            width: 145px;
            height: 60px;
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
