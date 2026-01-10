<script>
    import { authStore } from "../../utilFrontend/stores/authStore.js";
    import { navigate } from "svelte-routing";

    let { children } = $props();

    $effect(() => {
        if ($authStore.userRole !== "admin") {
            navigate("/", { replace: true });
        }
    });
</script>

{#if $authStore.userRole === "admin"}
    {@render children()}
{:else}
    <div class="flex items-center justify-center min-h-screen text-white">
        <p>Checking access...</p>
    </div>
{/if}
