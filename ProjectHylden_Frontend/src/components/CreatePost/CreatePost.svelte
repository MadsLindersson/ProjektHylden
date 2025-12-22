<script>
    import { Link, navigate } from "svelte-routing";
    import { authStore } from "../../utilFrontend/stores/authStore.js";
    import { postCreated } from "../../utilFrontend/toastr.js";
    import { API_URL } from "../../utilFrontend/constants.js";
    import { handleGetCategories } from "../../utilFrontend/categories.js";

    let title = $state("");
    let description = $state("");
    let category = $state();
    let files = $state();

    async function handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);

        if (files)   {
            for (let i = 0; i < files.length; i++)  {
                formData.append("postImages", files[i]);
            }
        };

        try {
            const response = await fetch(`${API_URL}/posts/${$authStore.userId}`, {
                method: "POST",
                body: formData
            });        

            if (response.ok) {
                postCreated(true);
                navigate(`/profile/${$authStore.userId}`);
            } else  {
                postCreated(false);
            };
        } catch (err)   {
            console.log("Something went wrong");  
        }
    }

    let categories = $state([]);

    $effect(() => {
        handleGetCategories().then(data => {
            categories = data;
        });
    });
</script>

<div class="flex h-screen items-center justify-center">
    
    <div class="flex max-w-5xl w-full bg-[black] rounded-xl shadow-2xl overflow-hidden">

        <div class="w-full lg:w-1/2 p-12 space-y-8 text-white">
            
            <Link to="/profile/{$authStore.userId}" class="
                inline-flex items-center
                text-gray-400 hover:text-white 
                transition duration-150 text-sm 
                mb-6
            "
            >
                <span class="mr-2">←</span> 
                Back to profile
            </Link>
            
            <div class="space-y-1">
                <div class="flex items-center text-xl font-bold">
                    <div class="flex items-center cursor-pointer"> 
                        <img 
                            src="/logo.png" 
                            alt="logo" 
                            class="h-10 w-auto" 
                        >
                    </div>
                    ProjectHylden
                </div>
                <h1 class="text-3xl font-bold pt-4">
                    Create New Post
                </h1>
                <p class="text-gray-400">
                    Share your latest work with the community.
                </p>
            </div>

            <form onsubmit={handleSubmit} class="space-y-6">

                <div class="space-y-1">
                    <label for="title" class="text-sm font-medium">Title</label>
                    <input 
                        bind:value={title}
                        type="text" 
                        id="title" 
                        placeholder="My Awesome Project"
                        required
                        class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500"
                    />
                </div>

                <div class="space-y-1">
                    <label for="description" class="text-sm font-medium">Description <span class="text-gray-500">(optional)</span></label>
                    <textarea 
                        bind:value={description}
                        id="description" 
                        placeholder="Tell us about your work..."
                        rows="4"
                        class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500 resize-none"
                    ></textarea>
                </div>

                <div class="space-y-1">
                    <label for="category" class="text-sm font-medium">Category</label>
                    <select
                        bind:value={category}
                        id="category" 
                        placeholder="e.g., Photography, UI/UX, 3D Art"
                        class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500"
                        required
                        >

                        <option value="" disabled selected>Select a category</option>
    
                        {#each categories as category}
                            <option value={category.id}>{category.name}</option>
                        {/each}
                    </select> 
                </div>

                <button 
                    type="submit" 
                    class="w-full font-medium py-3 rounded-lg shadow-lg transition duration-150 
                    bg-gradient-to-r from-[#EB7548] to-[#F5AE55] 
                    hover:from-[#E16538] hover:to-[#E59E45] text-black cursor-pointer"
                >
                    Publish Post
                </button>
            </form>

        </div>

        <div class="hidden lg:block lg:w-1/2 p-8 bg-gradient-to-r from-[#0D0B09] to-[#391E15]">
            <div class="h-full flex flex-col justify-center items-center text-center space-y-6">
                
                <label 
                    for="image-upload" 
                    class="w-full h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-dashed border-gray-600 hover:border-[#F5AE55] transition duration-300 cursor-pointer flex items-center justify-center relative"
                >
                    <div class="w-full h-full bg-[#1C1715] flex flex-col items-center justify-center space-y-3 text-gray-400 p-4">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>

                        <p class="text-base font-semibold">Click to upload images</p>
                        <p class="text-sm">PNG, JPG</p>
                        
                        <input 
                            type="file" 
                            id="image-upload" 
                            accept="image/*" 
                            class="hidden"
                            required
                            multiple
                            bind:files={files}
                            />
                    </div>
                </label>

                <h2 class="text-2xl font-bold text-white">
                    Image Preview
                </h2>
                <p class="text-gray-400 max-w-xs">
                    This will be the main image shown on your profile and in the feed.
                </p>
            </div>
        </div>
    </div>
</div>