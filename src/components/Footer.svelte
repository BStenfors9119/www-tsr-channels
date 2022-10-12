<script>
    import {cssVariables} from "../dynamic-css-vars";

    export let dropShadowColor = '#0000ff';
</script>

<div class="footer-container"
    use:cssVariables={{dropShadowColor}}>
    <div class="footer-center-item">
        <slot name="center-item"></slot>
    </div>
</div>

<style>
    @media screen and (min-width: 0px) and (max-width: 1080px) {
        .footer-container {
            min-width: 100vw;
            min-height: 50px;
        }

        .footer-center-item {
            width: 100vw;
            margin: 0 auto;
        }
    }
</style>
