<script>
  import { handleGetCategories } from "../../utilFrontend/FetchCategories.js";

    let categories = $state([]);

    $effect(() => {
        handleGetCategories().then(data => {
            categories = data;
        });
    });
</script>

<div class="flex space-x-3 overflow-x-auto pb-4 mb-12">
    <button class="flex-shrink-0 bg-gradient-to-r from-[#EB7548] to-[#F5AE55] hover:from-[#E16538] hover:to-[#E59E45] 
        text-black font-medium py-2 px-4 rounded-lg shadow-lg transition duration-150 cursor-pointer">
            All
    </button>
    
    {#each categories as category (category.id)}
        <button class="flex-shrink-0 bg-gradient-to-r from-[#EB7548] to-[#F5AE55] hover:from-[#E16538] hover:to-[#E59E45] 
        text-black font-medium py-2 px-4 rounded-lg shadow-lg transition duration-150 cursor-pointer">
            {category.name}
        </button>
    {/each}
</div>