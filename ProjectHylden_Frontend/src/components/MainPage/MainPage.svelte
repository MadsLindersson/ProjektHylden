<script>
    import { Link } from 'svelte-routing';
    import NavBar from "../NavBar";
</script>
<NavBar />

<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16">
    
    <div class="flex justify-center mb-8">
        <div class="inline-flex items-center space-x-2 text-sm font-medium py-1 px-4 rounded-full border border-[#EB7548] bg-[#22140F] text-[#EB7548]">
            <span>A home for creators</span>
        </div>
    </div>

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
        
        <Link to="/Profile" class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
            
            <div class="relative pb-[75%] bg-gray-700">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700 flex items-center justify-center text-gray-400">
                    Project Image Placeholder
                </div>
            </div>

            <div class="flex justify-between items-center p-3">
                
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full bg-red-500"></div> <span class="text-sm font-medium text-gray-300">Max Chen</span>
                </div>
                
                <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    Photography
                </span>
            </div>
        </Link>
        
        <div class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
            <div class="relative pb-[75%] bg-gray-700">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700 flex items-center justify-center text-gray-400">
                    Project Image Placeholder
                </div>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full bg-blue-500"></div>
                    <span class="text-sm font-medium text-gray-300">Elena Art</span>
                </div>
                <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    Illustration
                </span>
            </div>
        </div>

        <div class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
            <div class="relative pb-[75%] bg-gray-700">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700 flex items-center justify-center text-gray-400">
                    Project Image Placeholder
                </div>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full bg-green-500"></div>
                    <span class="text-sm font-medium text-gray-300">Jordan 3D</span>
                </div>
                <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    3D Art
                </span>
            </div>
        </div>

        <div class="bg-[#1A1715] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 cursor-pointer">
            <div class="relative pb-[75%] bg-gray-700">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700 flex items-center justify-center text-gray-400">
                    Project Image Placeholder
                </div>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center space-x-2">
                    <div class="w-6 h-6 rounded-full bg-yellow-600"></div>
                    <span class="text-sm font-medium text-gray-300">Maya Patel</span>
                </div>
                <span class="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    Typography
                </span>
            </div>
        </div>
        
        </div>
</div>