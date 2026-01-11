<script>
    import { API_URL } from "../../utilFrontend/constantsFrontend.js";
    import { Link } from "svelte-routing";
    import { handleProfileImageError } from "../../utilFrontend/imageErrors.js";
    import { somethingWentWrong } from "../../utilFrontend/toastr.js";
    import { onMount } from "svelte";

    import NavBar from "../NavBar";

    let users = $state([]);

    let searchQuery = $state("");

    let filteredUsers = $derived(
        users.filter((user) => {
            const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        })
    );

    async function handleGetUsers() {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            users = data.users;
        } catch (error) {
            console.log("Something went wrong: ", error);
            somethingWentWrong();
        }
    }

    onMount(() => {
        handleGetUsers();
    });
</script>

<NavBar />

<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 text-white">
    <header class="mb-10 space-y-2">
        <h1 class="text-4xl font-bold tracking-tight">Discover Creators</h1>
        <p class="text-gray-400">Explore the talented artists, designers, and creators who make this community special.</p>
    </header>

    <div class="mb-12">
        <div class="relative max-w-md">
            <input
                bind:value={searchQuery}
                type="text"
                placeholder="Search creators..."
                class="w-full bg-[#1A1715] text-gray-400 placeholder-gray-500 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700"
            />
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
        {#each filteredUsers as user}
            <Link
                to="/profile/{user.id}"
                class="bg-[#1A1715] p-6 rounded-xl shadow-lg flex space-x-4 border border-gray-800 hover:border-orange-500 transition duration-150 cursor-pointer"
            >
                <div class="flex-shrink-0">
                    <img
                        class="w-24 h-24 rounded-full bg-yellow-500 overflow-hidden"
                        src={`${API_URL}${user.profile_pic_url}`}
                        onerror={handleProfileImageError}
                        alt={user.username}
                    />
                </div>

                <div class="flex-grow">
                    <div class="text-xl font-semibold mb-1">
                        {user.username}
                    </div>
                    <p class="text-gray-400 text-sm mb-3">
                        {user.bio}
                    </p>
                    <span class="text-gray-500 text-xs">
                        {user.post_count} posts
                    </span>
                </div>
            </Link>
        {/each}
    </div>
</div>
