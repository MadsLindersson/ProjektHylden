<script>
    import { Link, navigate } from "svelte-routing";
    import { authStore } from "../../utilFrontend/stores/authStore.js";
    import { profileUpdated } from "../../utilFrontend/toastr.js";
    import { API_URL } from "../../utilFrontend/constantsFrontend.js";

    let { userId } = $props();

    let bio = $state();
    let user = $state();
    let files = $state();

    async function handleGetUser() {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        user = data.user;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();

        formData.append("bio", bio);

        if (files && files[0]) {
            formData.append("profilePic", files[0]);
        }

        try {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                profileUpdated(true);
                navigate(`/profile/${$authStore.userId}`);
            } else {
                profileUpdated(false);
            }
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    $effect(() => {
        handleGetUser();
    });

    let previewUrl = $state();

    $effect(() => {
        if (files && files[0]) {
            previewUrl = URL.createObjectURL(files[0]);
        }
    });
</script>

<div class="flex h-screen items-center justify-center">
    <div class="flex max-w-5xl w-full bg-[black] rounded-xl shadow-2xl overflow-hidden">
        <div class="w-full lg:w-1/2 p-12 space-y-8 text-white">
            <Link
                to="/profile/{$authStore.userId}"
                class="
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
                        <img src="/logo.png" alt="logo" class="h-10 w-auto" />
                    </div>
                    ProjectHylden
                </div>
                <h1 class="text-3xl font-bold pt-4">Update your profile</h1>
            </div>

            <form onsubmit={handleSubmit} class="space-y-6">
                {#if user}
                    <div class="space-y-1">
                        <label for="bio" class="text-sm font-medium">Bio</label>
                        <textarea
                            bind:value={bio}
                            placeholder="Tell people about yourself..."
                            id="description"
                            rows="4"
                            class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500 resize-none"
                            >{user.bio}</textarea
                        >
                    </div>
                {/if}

                <button
                    type="submit"
                    class="w-full font-medium py-3 rounded-lg shadow-lg transition duration-150
                    bg-gradient-to-r from-[#EB7548] to-[#F5AE55]
                    hover:from-[#E16538] hover:to-[#E59E45] text-black cursor-pointer"
                >
                    Update profile
                </button>
            </form>
        </div>

        <div class="hidden lg:block lg:w-1/2 p-8 bg-gradient-to-r from-[#0D0B09] to-[#391E15]">
            <div class="h-full flex flex-col justify-center items-center text-center space-y-6">
                <label
                    for="image-upload"
                    class="w-full h-80 rounded-xl overflow-hidden shadow-2xl border-2 border-dashed border-gray-600 hover:border-[#F5AE55] transition duration-300 cursor-pointer flex items-center justify-center relative"
                >
                    <div
                        class="w-full h-full bg-[#1C1715] flex flex-col items-center justify-center space-y-3 text-gray-400 p-4"
                    >
                        {#if previewUrl}
                            <img
                                src={previewUrl}
                                alt="Preview"
                                class="w-full h-full object-cover"
                            />

                            <div
                                class="absolute top-2 right-2 bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded"
                            >
                                New
                            </div>
                        {:else}
                            <div
                                class="w-full h-full bg-[#1C1715] flex flex-col items-center justify-center space-y-3 text-gray-400 p-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-12 h-12"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                                <p class="text-base font-semibold">
                                    Click to upload profile picture
                                </p>
                                <p class="text-sm">PNG, JPG</p>
                            </div>
                        {/if}

                        <p class="text-base font-semibold">Click to upload profile picture</p>
                        <p class="text-sm">PNG, JPG</p>

                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            class="hidden"
                            bind:files
                        />
                    </div>
                </label>

                <h2 class="text-2xl font-bold text-white">Image Preview</h2>
                <p class="text-gray-400 max-w-xs">This will be your profile picture</p>
            </div>
        </div>
    </div>
</div>
