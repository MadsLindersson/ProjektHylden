<script>
    import { Link } from 'svelte-routing';
    import NavBar from "../NavBar";
  import { onMount } from 'svelte';

    let exclude = [];

    let posts = [];

    let categories = [];

    async function handleGetPosts ()    {
        const response = await fetch("http://localhost:8080/posts/20", {
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

    <div class="flex space-x-3 overflow-x-auto pb-4 mb-8">
        <button class="flex-shrink-0 bg-[#EB7548] text-white font-medium py-2 px-4 rounded-lg shadow-md">
            All
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Photography
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Illustration
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Digital Art
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Graphic Design
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            UI/UX
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Typography
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            3D Art
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Animation
        </button>
        <button class="flex-shrink-0 bg-[#1A1715] hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition duration-150">
            Fine Art
        </button>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each posts as post}
            <Link to="/" class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
                
                <div class="relative pb-[75%] bg-gray-700">
                    <img
                        src={post.image_url || "/defaultPost.png"}
                        alt={post.title}
                        class="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div class="flex justify-between items-center p-3">
                    
                    <Link to="/profile/{post.user_id}" class="flex items-center space-x-2">
                        <img 
                            class="w-6 h-6 rounded-full bg-red-500"
                            src={post.profile_pic_url || "/defaultProfile.png"}
                            alt=""
                        /> 
                        <span class="text-sm font-medium text-gray-300">{post.username}</span>
                    </Link>
                    
                    <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                        {post.category_name}
                    </span>
                </div>
            </Link>
        {/each}
        
        </div>
</div>