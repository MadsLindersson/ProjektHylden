<script>
    import { Link } from "svelte-routing";
    import { API_URL } from "../../utilFrontend/constants.js";
    import { handlePostImageError, handleProfileImageError } from "../../utilFrontend/imageErrors.js";

    let { postItem, onSelect } = $props();
</script>

<button 
    onclick={() => onSelect(postItem)} 
    class="group bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer w-full"
>
    <div class="relative pb-[75%] bg-gray-700 overflow-hidden">
        <img
            src={`${API_URL}${postItem.image_urls}`}
            onerror={handlePostImageError}
            alt={postItem.title}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
    </div>

    <div class="flex justify-between items-center p-3">
        <Link to="/profile/{postItem.user_id}" class="flex items-center space-x-2">
            <img 
                class="w-6 h-6 rounded-full bg-red-500"
                src={`${API_URL}${postItem.profile_pic_url}`}
                onerror={handleProfileImageError}
                alt=""
            /> 
            <span class="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {postItem.username}
            </span>
        </Link>

        <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
            {postItem.category_name}
        </span>

        <div class="flex items-center gap-3">
            <div class="flex items-center gap-1 text-gray-500">
                <svg 
                    class="w-4 h-4 transition-all duration-200" 
                    fill={postItem.user_has_liked > 0 ? 'red' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-xs font-bold">{postItem.likes_count || 0}</span>
            </div>
        </div>
    </div>
</button>