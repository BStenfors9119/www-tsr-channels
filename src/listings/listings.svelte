<script>
    import moment from 'moment';
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';
    import {createEventDispatcher} from "svelte";

    export let listings = [];
    export let containerHeight = window.innerHeight * .8;

    const dispatch = createEventDispatcher();

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';
    let width = window.innerWidth;
    const itemsPerRow = width >= 1081 ?  3 : 1;
    let numOfRows = Math.round(listings.length / itemsPerRow);


    if((numOfRows * itemsPerRow) < listings.length) {
        numOfRows += 1
    }

    const getActiveListing = (rowIdx, itemsPerRowIdx) => {
        let localDate = new Date();
        let listing = itemsPerRow > 1 ? listings[itemsPerRowIdx] : listings[rowIdx + itemsPerRowIdx];
        if(rowIdx > 0 && itemsPerRow > 1) {
            const colIdx = (rowIdx * itemsPerRow) + itemsPerRowIdx;
            listing = listings[colIdx];
        }

        if(listing !== undefined) {
            const tzOffset = localDate.getTimezoneOffset();
            const gameStatusJsDate = new Date(listing.gameStatus);
            const easternGameStatus = moment(listing.gameStatus);

            const gameStatusSplit = listing.gameStatus.split(' ');
            if(gameStatusSplit[5] === 'AM' || gameStatusSplit[5] === 'PM') {
                gameStatusSplit[4] = listing.name;
                gameStatusSplit[gameStatusSplit.length - 1] = '';
                gameStatusSplit[gameStatusSplit.length - 2] = '';
                listing.gameStatus = gameStatusSplit.join(" ");
            }


            listing['odds'] = '';
            let eventOdds = listing.game.scoreInfo.eventOdds;
            if ( eventOdds !== undefined && eventOdds !== '') {
                eventOdds = eventOdds[0];
                listing['odds'] = `${eventOdds.details} (O/U ${eventOdds.overUnder})`
            }
        }

        return listing;
    }

    const gameSelected = game => {
        dispatch('gameSelected', {
            selectedGame: game
        })
    }
</script>

<div class="container" style="max-height: {containerHeight}px;"
     use:cssVariables={{buttonColor, bodyColor, containerHeight}}>

    {#each Array(numOfRows) as _, rowIdx}
        <div class="item-row">
            {#each Array(itemsPerRow) as _, idx}
                {@const listing = getActiveListing(rowIdx, idx)}
                {#if listing !== undefined}
                    <div class="game-card" on:click={() => {
                        gameSelected(listing);
                    }}>
                        <Card
                                titleColor="#A6A6A6"
                                cardWidth={'20vw'}
                                showActions={false}
                                on:click={() => {
                                    gameSelected(listing);
                                }}
                        >
                            <svelte:fragment slot="children">
                                <div class="listing">
                                    <div class="game-header">
                                        <div class="game-header-col-1">
                                            <img width="32" src={listing.game.leagueLogo} alt={listing.game.league} />
                                        </div>
                                        <div class="game-header-col-2">
                                            <label class="game-status-label">{listing.odds}</label>
                                        </div>
                                    </div>
                                    <div class="game-details">
                                        <div class="matchup">
                                            <div>
                                                <div class="team">
                                                    <div class="team-logo">
                                                        <img src={listing.game.teamOneLogo} width="64" alt={listing.game.teamOne} />
                                                    </div>
                                                    <div class="team-score">
                                                        <label>{listing.game.scoreInfo.teamOneScore}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="vs">
                                                vs
                                            </div>
                                            <div>
                                                <div class="team">
                                                    <div class="team-logo">
                                                        <img src={listing.game.teamTwoLogo} width="64" alt={listing.game.teamTwo} />
                                                    </div>
                                                    <div>
                                                        <label class="team-score">{listing.game.scoreInfo.teamTwoScore}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="game-info">
                                            <div>
                                                <label class="info-header">CHANNELS</label>
                                            </div>
                                            <div>
                                                {#each listing.game.providers[0].channels as channel, providerIdx}
                                                    <div class="channel-info"><label class="channel">{channel.channel}</label> ({channel.network})</div>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="game-footer">
                                        <div class="game-status">
                                            <div>
                                                <label class="game-status-label">{listing.gameStatus}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </svelte:fragment>
                        </Card>
                    </div>
                {:else}
                    <div class="game-card"></div>
                {/if}
            {/each}
        </div>

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
        .channel-info {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 16pt;
            display: inline-flex;
        }
        .channel {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 16pt;
            color: #f4f4f4;
        }
        .container {
            text-align: center;
            margin: 0 auto;
            width: 100%;
            overflow: auto;
            cursor: pointer;
        }
        .game-card {
            padding: 3px;
        }
        .game-details {
            display: inline-flex;
        }
        .game-header {
            flex: 1;
            flex-direction: row;
        }
        .game-header-col-1 {
            flex: 1;
        }
        .game-header-col-2 {
            flex: 11;
        }
        .game-header-col-3 {
            flex: 1;
            flex-direction: row;
        }
        .game-footer {

        }
        .game-info {
            flex: 8;
            text-align: left;
        }
        .game-status {
            flex: 12
        }
        .game-status-label {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 20pt;
            color: #1b7902;
            opacity: .7;
        }
        .info-header {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
        }
        .item-row {
            display: inline-flex;
        }
        .listing {
            display: inline-flex;
            flex-direction: column;
            padding: 3px;
        }
        .matchup {
            padding: 5px;
            flex: 4;
        }
        .team {
            display: inline-flex;
        }
        .team-logo {
            margin-right: 5px;
        }
        .team-score {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
            color: #1b7902;
            opacity: .7;
        }
        .vs {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
        }

    }

    @media screen and (min-width: 0px) and (max-width: 1080px) {
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
        .channel-info {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 16pt;
            display: inline-flex;
        }
        .channel {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 16pt;
            color: #f4f4f4;
        }
        .container {
            text-align: center;
            margin: 0 auto;
            overflow: scroll;
            cursor: pointer;
            max-height: var(--containerHeight)px;
        }
        .game-card {
            padding: 3px;
        }
        .game-details {
            display: inline-flex;
        }
        .game-info {
            flex: 8;
            text-align: left;
        }
        .game-status {
            flex: 12
        }
        .game-status-label {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 20pt;
            color: #1b7902;
            opacity: .7;
        }
        .info-header {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 28pt;
        }
        .item-row {

        }
        .listing {
            display: inline-flex;
            flex-direction: column;
            padding: 3px;
        }
        .matchup {
            padding: 5px;
            flex: 4;
        }
        .team {
            display: inline-flex;
        }
        .team-logo {
            margin-right: 5px;
        }
        .team-score {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
            color: #1b7902;
            opacity: .7;
        }
        .vs {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
        }

    }
</style>
