<script>
  import { handleGetCategories } from "../../utilFrontend/categories.js";

    const { chosenCategory, handleChoseCategory } = $props();

    let categories = $state([]);

    $effect(() => {
        handleGetCategories().then(data => {
            categories = data;
        });
    });
</script>

<div class="flex space-x-3 overflow-x-auto pb-4 mb-12">
    <button 
        onclick={() => handleChoseCategory("all")}
        class="flex-shrink-0 font-medium py-2 px-4 rounded-lg shadow-lg transition duration-150 cursor-pointer 
        {chosenCategory === 'all' 
            ? 'bg-gradient-to-r from-[#EB7548] to-[#F5AE55] text-black' 
            : 'bg-[#1A1715] text-white border border-white/10 hover:bg-[#25201E]'}"
    >
        All
    </button>
    
    {#each categories as category (category.id)}
        <button 
            onclick={() => handleChoseCategory(category.name)}
            class="flex-shrink-0 font-medium py-2 px-4 rounded-lg shadow-lg transition duration-150 cursor-pointer
            {chosenCategory === category.name 
                ? 'bg-gradient-to-r from-[#EB7548] to-[#F5AE55] text-black' 
                : 'bg-[#1A1715] text-white border border-white/10 hover:bg-[#25201E]'}"
        >
            {category.name}
        </button>
    {/each}
</div>