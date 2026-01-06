<script>
    import NavBar from "../NavBar";
    import CategoriesBar from '../CategoriesBar';
    import PostCard from '../PostCard';
    import Post from '../Post';
  import { API_URL } from "../../utilFrontend/constants";

    let posts = $state([]);

    let IsModalOpen = $state(false); 

    let post = $state();

    let chosenCategory = $state("all");

    let searchQuery = $state("");

    let filteredPosts = $derived(
        posts.filter(post => {
            const matchesCategory = chosenCategory === "all" || post.category_name === chosenCategory;

            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 post.description?.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        })
    );

    async function handleGetPosts ()    {
        const response = await fetch(`${API_URL}/posts`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        posts = data.posts;
    }

    function onSelect (postFromPostCard)    {
        post = postFromPostCard;
        IsModalOpen = true;
    }

    function onclose () {
        IsModalOpen = false;
    }

    function onDelete (deletedId)    {
        posts = posts.filter(post => post.id !== deletedId);
    }

    function handleChoseCategory (category)  {
        chosenCategory = category;
    }

    $effect(() => {
        handleGetPosts();
    });

</script>
<NavBar />

<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
    
    <header class="text-center mb-6">
        <h1 class="text-6xl sm:text-7xl font-extrabold tracking-tight mb-4 text-white">
            Share Your 
            <span 
                class="bg-clip-text text-transparent bg-gradient-to-r from-[#EB7548] to-[#F5AE55]"
            >
                Creative Vision
            </span>
        </h1>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Join a community of artists, designers, and creators. Upload your work, discover inspiration, and connect with fellow talent.
        </p>
    </header>

    <div class="flex justify-between items-end mt-20 mb-6">
        <h2 class="text-3xl font-bold text-white">
            Discover Creations
        </h2>

    <div class="flex-grow flex justify-center mx-10">
        <div class="relative hidden sm:block">
          <input
          bind:value={searchQuery}
            type="text"
            placeholder="Search..."
            class="w-96 bg-[#1A1715] text-gray-400 placeholder-gray-500 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="w-5 h-5"
                >
                <circle cx="11" cy="11" r="8"></circle> 
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>
    </div>

    <CategoriesBar {chosenCategory} {handleChoseCategory}/>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each filteredPosts as postItem (postItem.id)}
            <PostCard {postItem} {onSelect} />
        {/each}   
    </div>

    {#if IsModalOpen}
        <Post {post} {onclose} {onDelete}/>
    {/if}
</div>