<script>
    import { API_URL } from "../../utilFrontend/constantsFrontend.js";
    import { handleProfileImageError } from "../../utilFrontend/imageErrors.js";
    import { userUpdated, userDeleted } from "../../utilFrontend/toastr.js";
    import { confirmDelete } from "../../utilFrontend/sweetAlert.js"

    import NavBar from "../NavBar/NavBar.svelte";

    let users = $state([]);

    async function handleGetUsers() {
        const response = await fetch(`${API_URL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        users = data.users;
    }

    async function handleUpdateUserRole(userId, userRole) {
        const response = await fetch(`${API_URL}/users/${userId}/role`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userRole: userRole }),
        });

        const data = await response.json();

        if (response.ok) {
            userUpdated(true);
            const user = users.find((user) => user.id === userId);

            if (user) {
                user.role = userRole;
            }
        } else {
            userUpdated(false);
        }
    }

    async function handleDeleteUser(id) {
        const result = await confirmDelete();
        
        if (result.isConfirmed) {
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                userDeleted(true);

                users = users.filter((user) => user.id !== id);
            } else {
                userDeleted(false);
            }
        }
    }

    let searchQuery = $state("");

    let filteredUsers = $derived(
        users.filter((user) => {
            const matchesSearch =
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.role?.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSearch;
        })
    );

    $effect(() => {
        handleGetUsers();
    });
</script>

<NavBar />

<div class="min-h-screen bg-[#0B0A09] text-white flex">
    <aside class="w-64 border-r border-gray-800 p-6 hidden md:block">
        <nav class="space-y-2">
            <div
                class="px-4 py-3 rounded-lg bg-gradient-to-r from-[#EB7548] to-[#F5AE55] text-black font-semibold cursor-pointer"
            >
                Creator Management
            </div>
        </nav>
    </aside>

    <main class="flex-grow p-8 md:p-12">
        <header class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div class="space-y-2">
                <h1 class="text-4xl font-bold tracking-tight">Creator Management</h1>
                <p class="text-gray-400">View members, adjust roles, or remove accounts.</p>
            </div>

            <div class="relative w-full max-w-sm">
                <input
                    bind:value={searchQuery}
                    type="text"
                    placeholder="Search by username..."
                    class="w-full bg-[#1A1715] text-gray-300 placeholder-gray-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F5AE55] border border-gray-800 transition"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
            </div>
        </header>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {#each filteredUsers as user}
                <div
                    class="bg-[#1A1715] border border-gray-800 p-5 rounded-2xl flex items-center justify-between hover:border-gray-600 transition duration-300 shadow-xl"
                >
                    <div class="flex items-center space-x-4">
                        <div class="relative">
                            <img
                                class="w-24 h-24 rounded-full bg-yellow-500 overflow-hidden"
                                src={`${API_URL}${user.profile_pic_url}`}
                                onerror={handleProfileImageError}
                                alt={user.username}
                            />
                        </div>
                        <div>
                            <h3 class="font-bold text-lg text-white">{user.username}</h3>
                            <div class="flex items-center space-x-2">
                                <span
                                    class="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 tracking-widest"
                                >
                                    {user.role}
                                </span>
                                <span class="text-xs text-gray-500"
                                    >{new Date(user.created_at).toLocaleDateString("da-DK", {
                                        month: "long",
                                        year: "numeric",
                                    })}</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <div class="flex flex-col space-y-1">
                            <label
                                for="user-role"
                                class="text-[10px] text-gray-500 uppercase font-bold ml-1"
                                >Role</label
                            >
                            <select
                                id="user-role"
                                bind:value={user.role}
                                onchange={(e) => handleUpdateUserRole(user.id, user.role)}
                                class="bg-[#0B0A09] border border-gray-800 text-sm text-gray-300 rounded-lg px-3 py-2 outline-none focus:border-orange-500 transition cursor-pointer"
                            >
                                <option value="creator">Creator</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>

                        <button
                            onclick={() => handleDeleteUser(user.id)}
                            aria-label="Delete button {user.username}"
                            class="mt-5 p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent cursor-pointer hover:border-red-500/20"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </main>
</div>
