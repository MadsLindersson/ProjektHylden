<script>
    import { Link } from 'svelte-routing';
    import { onMount } from 'svelte';

    import NavBar from "../NavBar";
    import CategoriesBar from '../CategoriesBar';
    import PostCard from '../PostCard/PostCard.svelte';

    let exclude = [];

    let posts = [];

    let categories = [];

    async function handleGetPosts ()    {
        const response = await fetch("http://localhost:8080/posts/gallery/20", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exclude)
        });

        const data = await response.json();

        posts = [...posts, ...data.posts];

        for (let post of data.posts) {
            exclude.push(post.id);
        }
    }

    onMount(() => {
        handleGetPosts();
    })

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
            Join a community of artists, designers, and creators. Upload your work, discover inspiration, and connect with fellow creatives.
        </p>
    </header>

    <div class="flex justify-between items-end mt-20 mb-6">
        <h2 class="text-3xl font-bold text-white">
            Discover Creations
        </h2>
        
        <div class="flex items-center space-x-2 p-2 rounded-lg bg-[#1A1715] text-white cursor-pointer">
            <span>
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                </svg>
            </span>
            <span class="font-medium">Latest</span>
            <span>&#x25BC;</span>
        </div>
    </div>

    <CategoriesBar />
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each posts as post}
            <PostCard post = {post}/>
        {/each}   
    </div>
</div>