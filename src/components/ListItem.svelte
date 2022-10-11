<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

const listItemClicked = () => {
  dispatch('clicked', {

  })
}
</script>

<div class="inner-container" on:click={listItemClicked}>
    <div class="left-item">
        <slot name="left-item"></slot>
    </div>
    <div class="center-item">
        <slot name="center-item"></slot>
    </div>
    <div class="right-item">
        <slot name="right-item"></slot>
    </div>
</div>

<style>
    .inner-container {
        padding: 5px;
        width: 90%;
        height: 50px;
        margin: 0 auto;
        margin-top: 15px;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        display: inline-flex;
        box-shadow: 2px 2px 8px #999999;
        border-radius: 6px;
    }
    .left-item {
        flex: 4;
        justify-items: center;
    }
    .center-item {
        flex: 4
    }
    .right-item {
        flex: 4
    }
</style>
