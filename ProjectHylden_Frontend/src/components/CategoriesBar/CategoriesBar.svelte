<script>
    import { onMount } from "svelte";

    let categories = [];

    let chosenCategory = "all";

    async function handleGetCategories ()   {
        const response = await fetch("http://localhost:8080/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        
        categories = data.categories;
    }

    function selectCategory (categoryId)  {
        chosenCategory = categoryId;
    }

    onMount(() => {
        handleGetCategories();
    })
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