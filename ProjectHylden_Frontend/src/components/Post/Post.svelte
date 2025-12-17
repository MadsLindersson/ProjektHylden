<script>
    export let userId; 
    export let API_URL = "http://localhost:8080";

    // Assuming post.images is an array of objects: {image_url: '...'}
    // If you only have the one main image for now, wrap it in an array
    /* let images = post.images || [{ image_url: post.image_url }]; */
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    
    <div class="bg-[#1C1715] w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5">
        
        <div class="relative flex-1 bg-[#141110] flex flex-col">
            <div class="flex-1 flex items-center justify-center p-8">
                <div class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full w-full">
                    <div class="flex-shrink-0 w-full h-full snap-center flex items-center justify-center">
                        <img 
                            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80" 
                            alt="Urban Solitude" 
                            class="max-w-full max-h-full object-contain rounded-sm"
                        />
                    </div>
                </div>
            </div>

            <div class="h-12 bg-[#261E1B] w-full px-4 flex items-center justify-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            </div>
        </div>

        <div class="w-full md:w-[380px] flex flex-col bg-[#1C1715]">
            
            <div class="p-5 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=Max+Chen&background=random" alt="User" class="w-10 h-10 rounded-full border border-white/10" />
                    <div class="flex flex-col">
                        <span class="text-white font-medium text-sm">Max Chen</span>
                    </div>
                </div>
                <button class="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-gray-400 hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div class="px-5 flex-1">
                <div class="border border-white/20 rounded-2xl p-5 mb-4">
                    <h2 class="text-white text-xl font-bold font-serif mb-2">Urban Solitude</h2>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">
                        Street photography capturing the quiet moments in a bustling city.
                    </p>

                    <div class="flex items-center gap-4 text-xs font-medium">
                        <span class="bg-[#332A26] text-white px-4 py-1.5 rounded-full border border-white/5">
                            Photography
                        </span>
                        <div class="flex items-center gap-1.5 text-gray-500">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            October 12, 2024
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Utility to hide scrollbar while keeping snap functionality */
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>