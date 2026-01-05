<script>
    import { Link } from 'svelte-routing';
    import { authStore } from "../../utilFrontend/stores/authStore.js";
    import { API_URL } from "../../utilFrontend/constants.js";
    import { handleProfileImageError } from "../../utilFrontend/imageErrors.js";

    import NavBar from "../NavBar";
    import CategoriesBar from "../CategoriesBar";
    import PostCard from '../PostCard/PostCard.svelte';
    import Post from "../Post/Post.svelte";


    let { userId } = $props();

    let IsModalOpen = $state(false); 

    let post = $state();

    let user = $state({username: "", bio: "", profile_pic_url: "", created_at: null, });

    let posts = $state([]);

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

    async function handleGetUser ()    {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        user = data.user;
        
    }

        async function handleGetPosts ()    {
        const response = await fetch(`http://localhost:8080/posts/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        posts = data.posts;
    }

    function onDelete (deletedId)    {
        posts = posts.filter(post => post.id !== deletedId);
    }

    function handleChoseCategory (category)  {
        chosenCategory = category;
    }

    function onSelect (postFromPostCard)    {
        post = postFromPostCard;
        IsModalOpen = true;
    }

    function onclose () {
        IsModalOpen = false;
    }

    $effect(() => {
        if (userId) {
            handleGetUser();
            handleGetPosts();
        }
    }); 
    
</script>

<NavBar /> 

<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 text-white">

    <header class="mb-10 flex items-start space-x-6">
        
        <div class="flex-shrink-0 relative"> 
            {#if user.username}
                <img
                    src={`${API_URL}${user.profile_pic_url}`}
                    onerror={handleProfileImageError}
                    alt={user.username} 
                    class="w-24 h-24 rounded-full bg-yellow-500 overflow-hidden"
                />
            {:else}
                <div class="w-24 h-24 rounded-full bg-gray-700 animate-pulse"></div>
            {/if}

            {#if $authStore.isAuthenticated && $authStore.userId == userId}
                <Link to="/editprofile/{$authStore.userId}">
                    <img src="/edit.svg" alt="" class="absolute bottom-0 right-0 p-1 bg-transparent rounded-full text-white shadow-lg h-7 cursor-pointer hover:bg-[#F5AE55] transition duration-150">
                </Link>
            {/if}
        </div>

        <div class="space-y-1 pt-2">
            <h1 class="text-4xl font-extrabold tracking-tight">
                {user.username}
            </h1>
            
            <div class="flex items-center space-x-2">
                <p class="text-xl text-gray-300 max-w-3xl">
                    {user.bio}
                </p>
                {#if $authStore.isAuthenticated && $authStore.userId == userId}
                    <Link to="/editprofile/{$authStore.userId}">
                        <img src="/edit.svg" alt="" class="p-1 bg-transparent rounded-full text-white shadow-lg h-7 cursor-pointer hover:bg-[#F5AE55] transition duration-150">
                    </Link>
                {/if}
            </div>
            <div class="flex items-center space-x-4 text-gray-500 text-sm pt-2">
                <span class="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>
                        {new Date(user.created_at).toLocaleDateString("da-DK", { month: "long", year: "numeric" })}
                    </span>

                </span>
                
                <span class="text-[#F5AE55] ">•</span>
                <span>{posts.length} posts</span>
            </div>
        </div>
    </header>

    <div class="w-full border-t border-gray-800 my-8"></div>
    
    <div class="flex justify-between items-end mb-6">
        <h2 class="text-3xl font-bold text-white">
            Works
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

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#if $authStore.isAuthenticated && $authStore.userId == userId}
            <Link to="/createpost" class="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer border border-gray-800 hover:bg-gray-700 hover:border-[#F5AE55] hover:shadow-lg">
                <div class="relative flex items-center justify-center">
                    <img
                        src="/plusIcon.svg"
                        alt="Create post" 
                    />
                </div>
            </Link>
        {/if}
        
        {#each filteredPosts as postItem}
            <PostCard postItem = {postItem} onSelect = {onSelect}/>
        {/each}   
    </div>

    {#if IsModalOpen}
        <Post {post} {onclose} {onDelete}/>
    {/if}
</div>