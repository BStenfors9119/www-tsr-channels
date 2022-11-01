<script>
  import { createEventDispatcher } from 'svelte';
  import { cssVariables } from "../dynamic-css-vars";

  const dispatch = createEventDispatcher();

  export let title = '';
  export let titleSize = '18px';
  export let cardWidth = 50;
  export let children = null;
  export let dropShadowColor = '#999999';
  export let titleColor = 'green';
  export let showActions = true;

  let total = 0;

  export const cardClicked = (ev) => {
    console.log('card clicked');
    dispatch("clicked", {
      divEvent: ev
    })
  }
</script>

<div class="inner-container"
     on:click={cardClicked}
     use:cssVariables={{dropShadowColor,
        cardWidth,
        titleColor,
        titleSize}}>
    <div class="inner-container-child">
        <label class="title">{title}</label>
    </div>

    <slot name="children"></slot>
    {#if showActions}
        <div class="actions">
            <slot name="actions"></slot>
        </div>
    {/if}
</div>

<!--Green and black gradient-->
<!--background: rgb(27,121,2);-->
<!--background: linear-gradient(0deg, rgba(27,121,2,1) 0%, rgba(2,8,0,1) 100%);-->
<style>
    @media screen and (min-width: 1081px) and (max-width: 2560px)  {
        .actions {
            display: inline-flex;
            flex-direction: row-reverse;
            padding: 10px;
        }

        .inner-container {
            width: var(--cardWidth);
            margin: 0 auto;
            margin-top: 15px;
            flex-direction: column;
            justify-content: center;
            justify-items: center;
            display: flex;
            border: solid 1px darkgreen;
            border-radius: 10px;
            background-color: #000000;
        }

        .inner-container-child {
            padding: 3px;
            flex: 12;
            flex-direction: row;
        }

        .title {
            flex: auto;
            font-weight: bold;
            font-size: 18pt;
            color: var(--titleColor);
        }

        .main-button {
            flex: 1
        }

        .main-label {
            flex: 11;
            font-weight: bold;
            font-family: "DejaVu Sans Mono", serif;
        }

        .main-value {
            flex: 1;
            font-family: "DejaVu Sans Mono", serif;
        }

        .table-row {
            display: inline-flex;
        }
    }
    @media screen and (min-width: 0px) and (max-width: 1080px) {
        .actions {
            display: inline-flex;
            flex-direction: row-reverse;
            padding: 10px;
        }

        .inner-container {
            margin: 0 auto;
            margin-top: 15px;
            flex-direction: column;
            justify-content: center;
            justify-items: center;
            display: flex;
            border: solid 1px darkgreen;
            border-radius: 10px;
            background-color: #000000;
        }

        .inner-container-child {
            padding: 3px;
            flex: 12;
            flex-direction: row;
        }

        .title {
            flex: auto;
            font-weight: bold;
            font-size: var(--titleSize);
            color: var(--titleColor);
        }

        .main-button {
            flex: 1
        }

        .main-label {
            flex: 11;
            font-weight: bold;
            font-family: "DejaVu Sans Mono", serif;
        }

        .main-value {
            flex: 1;
            font-family: "DejaVu Sans Mono", serif;
        }

        .table-row {
            display: inline-flex;
        }
    }
</style>
