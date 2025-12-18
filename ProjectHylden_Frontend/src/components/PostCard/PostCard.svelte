<script>
    import { Link } from "svelte-routing";
    import { API_URL } from "../../utilFrontend/constants.js";
    import { handlePostImageError, handleProfileImageError } from "../../utilFrontend/imageErrors.js";

    let { post, onSelect } = $props();
</script>

<button onclick={() => onSelect(post)} class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
                
    <div class="relative pb-[75%] bg-gray-700">
        <img
            src={`${API_URL}${post.image_urls}`}
            onerror={handlePostImageError}
            alt={post.title}
            class="absolute inset-0 w-full h-full object-cover"
        />
    </div>

    <div class="flex justify-between items-center p-3">
        
        <Link to="/profile/{post.user_id}" class="flex items-center space-x-2">
            <img 
                class="w-6 h-6 rounded-full bg-red-500"
                src={`${API_URL}${post.profile_pic_url}`}
                onerror={handleProfileImageError}
                alt=""
            /> 
            <span class="text-sm font-medium text-gray-300">{post.username}</span>
        </Link>
        
        <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
            {post.category_name}
        </span>
    </div>
</button>