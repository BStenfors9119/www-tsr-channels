<script>

    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    export let navIcons = [];

    export const iconButtonClicked = (ev, handler) => {
      dispatch('iconButtonClicked', {
        iconButtonEv: ev,
        handler: handler
      })
    }

</script>

<div class="inner-container">
    {#each navIcons as icon}
        <div class="icon-button-container">
            <div class="icon-button" on:click={() => {
              iconButtonClicked(icon.onClick)
            }}>
                <div>
                    <label>{icon.label}</label>
                </div>
                <div class="icon-button-icon">
                    <svelte:component this={icon.icon} />
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .icon-button {
        width: 125px;
        display: inline-flex;
        border: solid 1px #798EB0;
        border-radius: 3px;
        cursor: pointer;
    }

    .icon-button > div {
        color: #0E264A;
        padding: 7px;
        justify-content: center;
        justify-items: baseline;
    }

    .icon-button-icon {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: flex-end;
        flex: 1;
    }

    .icon-button-container {
        margin-right: 11px;
    }

    .inner-container {
        padding: 5px;
        height: 50px;
        width: 100vw;
        flex-direction: row;
        justify-content: flex-start;
        display: inline-flex;
    }
</style>
