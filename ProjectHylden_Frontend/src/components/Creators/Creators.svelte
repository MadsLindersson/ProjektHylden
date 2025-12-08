<script>
    import { Link } from 'svelte-routing';
    import NavBar from "../NavBar";
</script>

<NavBar />

<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 text-white">
    
    <header class="mb-10 space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">
            Discover Creators
        </h1>
        <p class="text-gray-400">
            Explore the talented artists, designers, and creators who make this community special.
        </p>
    </header>

    <div class="mb-12">
        <div class="relative max-w-md">
            <input
                type="text"
                placeholder="Search creators..."
                class="w-full bg-[#1A1715] text-gray-400 placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-red-600">
                    </div>
            </div>
            
            <div class="flex-grow">
                <div class="text-xl font-semibold mb-1">
                    Elena Rodriquez
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @elena_arts
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    Digital artist & illustrator based in Barcelona. Creating vibrant worlds on canvas.
                </p>
                <span class="text-gray-500 text-xs">
                    3 posts
                </span>
            </div>
        </div>

        <Link to="/Profile" class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-yellow-500">
                    </div>
            </div>
            <div class="flex-grow">
                <div class="text-xl font-semibold mb-1">
                    Max Chen
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @max_creative
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    Photographer & visual storyteller. Capturing moments that matter.
                </p>
                <span class="text-gray-500 text-xs">
                    3 posts
                </span>
            </div>
        </Link>
        
        <div class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-blue-500">
                    </div>
            </div>
            <div class="flex-grow">
                <div class="flex justify-between items-start">
                    <div class="text-xl font-semibold mb-1">
                        Sarah Mitchell
                    </div>
                    <span class="text-xs bg-gray-600 text-gray-200 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        Admin
                    </span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @sarah_designs
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    UI/UX designer passionate about creating beautiful, functional interfaces.
                </p>
                <span class="text-gray-500 text-xs">
                    2 posts
                </span>
            </div>
        </div>

        <div class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-green-500">
                    </div>
            </div>
            <div class="flex-grow">
                <div class="text-xl font-semibold mb-1">
                    Jordan Williams
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @jordan_3d
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    3D artist and animator. Building impossible worlds in digital space.
                </p>
                <span class="text-gray-500 text-xs">
                    2 posts
                </span>
            </div>
        </div>
        
        <div class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-purple-500">
                    </div>
            </div>
            <div class="flex-grow">
                <div class="text-xl font-semibold mb-1">
                    Maya Patel
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @maya_typography
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    Type designer & lettering artist. Words are my canvas.
                </p>
                <span class="text-gray-500 text-xs">
                    2 posts
                </span>
            </div>
        </div>

        <div class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer">
            <div class="flex-shrink-0">
                <div class="w-16 h-16 rounded-full bg-teal-500">
                    </div>
            </div>
            <div class="flex-grow">
                <div class="text-xl font-semibold mb-1">
                    Kevin Li
                </div>
                <div class="flex items-center space-x-2 text-sm text-orange-400 mb-2">
                    @kevin_uiux
                </div>
                <p class="text-gray-400 text-sm mb-3">
                    Focused on crafting seamless user experiences and modern interfaces.
                </p>
                <span class="text-gray-500 text-xs">
                    4 posts
                </span>
            </div>
        </div>

    </div>

</div>