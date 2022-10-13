<script>
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';

    export let listings = [];
    export let containerHeight = window.innerHeight * .8;

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';
    let width = window.innerWidth;
    const itemsPerRow = width >= 1081 ?  3 : 1;
    let numOfRows = Math.round(listings.length / itemsPerRow);


    if((numOfRows * itemsPerRow) < listings.length) {
        numOfRows += 1
    }

    const getActiveListing = (rowIdx, itemsPerRowIdx) => {
        let listing = itemsPerRow > 1 ? listings[itemsPerRowIdx] : listings[rowIdx + itemsPerRowIdx];
        if(rowIdx > 0 && itemsPerRow > 1) {
            const colIdx = (rowIdx * itemsPerRow) + itemsPerRowIdx;
            listing = listings[colIdx];
        }

        return listing;
    }
</script>

<div class="container" style="max-height: {containerHeight}px;"
     use:cssVariables={{buttonColor, bodyColor, containerHeight}}>
    {#each Array(numOfRows) as _, rowIdx}
        <div class="item-row">
            {#each Array(itemsPerRow) as _, idx}
                {@const listing = getActiveListing(rowIdx, idx)}
                {#if listing !== undefined}
                    <div class="game-card">
                        <Card
                                titleColor="#A6A6A6"
                                cardWidth={'20vw'}
                                showActions={false}
                        >
                            <svelte:fragment slot="children">
                                <div class="listing">
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
        .game-info {
            flex: 8;
            text-align: left;
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
        .game-info {
            flex: 8;
            text-align: left;
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
        }
        .vs {
            font-family: "DejaVu Sans Mono", serif;
            font-weight: bold;
            font-size: 32pt;
        }

    }
</style>
