<script>
    import {cssVariables} from "../dynamic-css-vars";

    export let dropShadowColor = '#0000ff';
</script>

<div class="container"
    use:cssVariables={{dropShadowColor}}>
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
    @media screen and (min-width: 0px) and (max-width: 1080px) {
        .container {
            padding: 15px;
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;
            justify-items: baseline;
            min-height: 50px;
            box-shadow: 0px 7px 5px -4px var(--dropShadowColor);
        }

        .left-item {
            flex: 4;
            justify-items: baseline;
        }

        .center-item {
            flex: 4
        }

        .right-item {
            flex: 4;
        }
    }
</style>
