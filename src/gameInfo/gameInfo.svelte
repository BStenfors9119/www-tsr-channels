<script>
    import { cssVariables } from "../dynamic-css-vars";
    import Card from '../components/Card.svelte';

    export let gameInfo = null;
    export let containerHeight = window.innerHeight * .8;

    let bodyColor = '#E9E9E9';
    let buttonColor = '#1A3662';
    let width = window.innerWidth;

    const gameSituation = gameInfo.game.scoreInfo.everythingElse[0].competitions[0].situation;
</script>

<div class="container"
     use:cssVariables={{buttonColor, bodyColor, containerHeight}}>
    <Card
            title={gameInfo.game.matchup}
            titleSize="15pt"
            titleColor="#A6A6A6"
            cardWidth={'20vw'}
            showActions={false}>
        <svelte:fragment slot="children">
            <div class="game-details">
            <div class="matchup">
                <div>
                    <div class="team">
                        <div class="team-logo">
                            <img src={gameInfo.game.teamOneLogo} width="64" alt={gameInfo.game.teamOne} />
                        </div>
                        <div class="team-score">
                            <label>{gameInfo.game.scoreInfo.teamOneScore}</label>
                        </div>
                    </div>
                </div>
                <div class="vs">
                    vs
                </div>
                <div>
                    <div class="team">
                        <div class="team-logo">
                            <img src={gameInfo.game.teamTwoLogo} width="64" alt={gameInfo.game.teamTwo} />
                        </div>
                        <div>
                            <label class="team-score">{gameInfo.game.scoreInfo.teamTwoScore}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game-info">
                <div>
                    <label class="info-header">CHANNELS</label>
                </div>
                <div>
                    {#each gameInfo.game.providers[0].channels as channel, providerIdx}
                        <div class="channel-info"><label class="channel">{channel.channel}</label> ({channel.network})</div>
                    {/each}
                </div>
            </div>

        </div>
            <div class="game-footer">
                <label class="game-status-label">
                    {gameInfo.gameStatus}
                </label><br />
                {#if gameSituation !== undefined}
                    <label class="game-status-label">
                        Last Play: <br />{gameSituation.lastPlay.text}
                    </label>
                {/if}
            </div>
        </svelte:fragment>
    </Card>
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
