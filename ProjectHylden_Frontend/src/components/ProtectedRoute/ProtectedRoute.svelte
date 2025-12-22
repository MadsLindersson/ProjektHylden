<script>
    import { authStore } from '../../utilFrontend/stores/authStore.js';
    import { navigate } from 'svelte-routing';

    let { children } = $props();

    $effect(() => {
        if (!$authStore.isAuthenticated)    {
            navigate("/signin", { replace: true });
        }
    });
</script>

{#if $authStore.isAuthenticated}
    {@render children()}
{:else}
    <div class="flex items-center justify-center min-h-screen text-white">
        <p>Checking access...</p>
    </div>
{/if}