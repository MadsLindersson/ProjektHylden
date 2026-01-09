<script>
    import { Link, navigate } from 'svelte-routing';
    import { accountCreated, pwNotAMatch, somethingWentWrong, emailOrUsernameExists } from '../../utilFrontend/toastr.js';
    import { API_URL } from '../../utilFrontend/constants.js';

    let username = $state("");
    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");

    async function handleSubmit (event)  {
        event.preventDefault();

        if (password !== confirmPassword)   {
            pwNotAMatch();
            return;
        };

        const user = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch (`${API_URL}/signUp`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            if (response.ok)   {
                accountCreated(true);
                navigate("/signin")
            } else  {
                emailOrUsernameExists();
            };

        } catch (error)  {
            console.log("Something went wrong:", error);
            somethingWentWrong();
        }
    }
</script>

<div class="flex h-screen items-center justify-center">
    
    <div class="flex max-w-5xl w-full bg-[black] rounded-xl shadow-2xl overflow-hidden">

        <div class="w-full lg:w-1/2 p-12 space-y-8 text-white">
            
            <Link to="/" class="
                inline-flex items-center
                text-gray-400 hover:text-white 
                transition duration-150 text-sm 
                mb-6
            "
            >
                <span class="mr-2">←</span> 
                Back to home
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
                    Create your account
                </h1>
                <p class="text-gray-400">
                    Join our community of creators and share your work
                </p>
            </div>

            <form onsubmit={handleSubmit} class="space-y-6">

                <div class="space-y-1">
                    <label for="username" class="text-sm font-medium">Username</label>
                    <input 
                        bind:value={username}
                        type="text" 
                        id="username" 
                        placeholder="your_username"
                        required
                        class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500"
                    />
                </div>

                <div class="space-y-1">
                    <label for="email" class="text-sm font-medium">Email</label>
                    <input 
                        bind:value={email}
                        type="email" 
                        id="email" 
                        placeholder="you@example.com"
                        required
                        class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500"
                    />
                </div>

                <div class="space-y-1">
                    <label for="password" class="text-sm font-medium">Password</label>
                    <div class="relative">
                        <input 
                            bind:value={password}    
                            type="password" 
                            id="password" 
                            placeholder="********" 
                            required
                            class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500 pr-10"
                            />
                    </div>
                </div>

                <div class="space-y-1">
                    <label for="confirmPassword" class="text-sm font-medium">Confirm password</label>
                    <div class="relative">
                        <input 
                            bind:value={confirmPassword}
                            type="password" 
                            id="confirmPassword" 
                            placeholder="********" 
                            required
                            class="w-full px-4 py-3 rounded-lg bg-[#1C1715] border border-transparent focus:border-orange-500 focus:ring-0 text-white placeholder-gray-500 pr-10"
                            />
                    </div>
                </div>

                <button 
                    type="submit" 
                    class="w-full font-medium py-3 rounded-lg shadow-lg transition duration-150 
                    bg-gradient-to-r from-[#EB7548] to-[#F5AE55] 
                    hover:from-[#E16538] hover:to-[#E59E45] text-black cursor-pointer"
                >
                    Create Account
                </button>
            </form>
            
            <div class="text-center text-sm pt-4">
                Already have an account? 
                <Link to="/signin" class="text-[#EB7548] hover:text-[#E59E45] transition duration-150 font-medium cursor-pointer">
                    Sign in
                </Link>
            </div>

        </div>

        <div class="hidden lg:block lg:w-1/2 p-8 bg-gradient-to-r from-[#0D0B09] to-[#391E15]">
            <div class="h-full flex flex-col justify-center items-center text-center space-y-6">
                
                <div class="w-full h-80 rounded-xl overflow-hidden shadow-2xl">
                    <div class="w-full h-full bg-gradient-to-br from-purple-800 via-orange-500 to-indigo-900 opacity-90"></div>
                </div>

                <h2 class="text-2xl font-bold text-white">
                    Showcase Your Creativity
                </h2>
                <p class="text-gray-400 max-w-xs">
                    Join artists and designers sharing their work with a passionate community.
                </p>
            </div>
        </div>
    </div>
</div>