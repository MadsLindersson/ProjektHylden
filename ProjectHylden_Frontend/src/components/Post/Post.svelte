<script>
    import { API_URL } from "../../utilFrontend/constants.js";
    import { handlePostImageError, handleProfileImageError } from "../../utilFrontend/imageErrors.js";

    let { post, onclose } = $props();

    let images = $state();
    
    let selectedIndex = $state(null);

    const closeBigView = () => selectedIndex = null;

    async function handleGetImageUrls ()    {
        const response = await fetch(`${API_URL}/imageurls/${post.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json(); 

        images = data.imageUrls;
    }

    function next() {
        if (selectedIndex < images.length - 1) {
            selectedIndex++;
        } else {
            selectedIndex = 0;
        }
    }

    function prev() {
        if (selectedIndex > 0) {
            selectedIndex--;
        } else {
            selectedIndex = images.length - 1;
        }
    }

    $effect(() => {
        handleGetImageUrls();
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    })
    
</script>

<div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    onclick={(e) => e.target === e.currentTarget && onclose()}
    role="none"
    tabindex="-1"
>
    <section class="bg-[#1C1715] w-full max-w-5xl h-[70vh] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5">
        
        <section class="flex-1 bg-[#141110] flex flex-col p-4 overflow-y-auto relative h-full custom-scrollbar">
            <div class="grid grid-cols-2 gap-4 h-fit">
                {#each images as img, i}
                    <button 
                        type="button"
                        onclick={() => selectedIndex = i}
                        aria-label="View image {i + 1}"
                        class="relative aspect-square overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-white/30 transition-all group"
                    >
                        <img 
                            src={`${API_URL}${img.image_url}`}
                            onerror={handlePostImageError}
                            alt="Gallery item" 
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </button>
                {/each}
            </div>

            {#if selectedIndex !== null}
                <div 
                    class="absolute inset-0 z-[60] bg-[#141110] flex flex-col items-center justify-center p-4"
                    role="dialog"
                >
                    <button 
                        aria-label="Close button"
                        onclick={closeBigView}
                        class="absolute top-4 right-4 z-[70] p-2 bg-black/50 text-gray-400 rounded-full cursor-pointer hover:text-white transition-colors"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {#if images.length > 1}
                        <button aria-label="Previous photo button" onclick={prev} class="absolute left-4 z-[70] p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button aria-label="Next photo button" onclick={next} class="absolute right-4 z-[70] p-3 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors cursor-pointer">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    {/if}

                    <div class="w-full h-full overflow-hidden flex items-center justify-center">
                        <div class="flex w-full h-full transition-transform duration-500 ease-in-out" style="transform: translateX(-{selectedIndex * 100}%);">
                            {#each images as img}
                                <div class="flex-shrink-0 w-full h-full flex items-center justify-center p-4">
                                    <img src={`${API_URL}${img.image_url}`} onerror={handlePostImageError} alt="Enlarged view" class="max-w-full max-h-full object-contain shadow-2xl" />
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </section>

        <div class="w-full md:w-[380px] flex flex-col bg-[#1C1715] h-full border-l border-white/5">
            <header class="p-5 flex items-center justify-between flex-shrink-0">
                <div class="flex items-center gap-3">
                    <img src={`${API_URL}${post.profile_pic_url}`} onerror={handleProfileImageError} alt="User Avatar" class="w-10 h-10 rounded-full border border-white/10" />
                    <span class="text-white font-medium text-sm">{post.username}</span>
                </div>
                <button aria-label="Close button" onclick={onclose} class="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-gray-400 cursor-pointer hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>

            <div class="px-5 flex-1 overflow-y-auto custom-scrollbar pb-5">
                <div class="border border-white/20 rounded-2xl p-5 mb-4">
                    <h2 class="text-white text-xl font-bold mb-2">{post.title}</h2>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">{post.description}</p>

                    <footer class="flex items-center gap-4 text-xs font-medium">
                        <span class="bg-[#332A26] text-white px-4 py-1.5 rounded-full border border-white/5">{post.category_name}</span>
                        <div class="flex items-center gap-1.5 text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                             {new Date(post.created_at).toLocaleDateString("da-DK", { month: "long", year: "numeric" })}
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 5px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #332A26; border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #443833; }
</style>