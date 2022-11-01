<script>
    import { onMount } from "svelte";
    import Providers from './providers/providers.svelte';

    onMount(() => {
        console.log(window.location);
    })


</script>

<div>
    {#if window.location.pathname === "/providers"}
        <Providers zip="92014" />
    {/if}
</div>
