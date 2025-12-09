<script>
   import { Link, navigate } from 'svelte-routing';
   import { authStore, clientLogout } from '../../utilFrontend/stores/authStore.js';
   import { signOutNotification } from '../../utilFrontend/toastr.js';

   async function handleSignOut () {
      const response = await fetch("http://localhost:8080/signOut", {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok)  {
        clientLogout();
        signOutNotification(true);
        navigate("/");
      } else  {
        signOutNotification(false);
        console.log("Something went wrong on the server");
      };
   }
</script>

<nav class="bg-transparent border-b border-gray-800 text-white">
  <div class="max-w-7xl mx-auto">
    
    <div class="flex justify-between items-center h-20">

      <Link to="/" class="flex items-center cursor-pointer"> 
        <img 
          src="/src/assets/logo.png" 
          alt="logo" 
          class="h-10 w-auto" 
        >
      </Link>
      
      <Link to="/" class="text-2xl font-bold cursor-pointer">
        ProjektHylden
      </Link>

      <div class="flex-grow flex justify-center mx-10">
        <div class="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search posts or creators..."
            class="w-96 bg-[#1A1715] text-gray-400 placeholder-gray-500 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
      
      <div class="flex items-center space-x-6">
        <Link to="/" class="text-gray-300 hover:text-white transition duration-150">
          Explore
        </Link>
        <Link to="/Creators" class="text-gray-300 hover:text-white transition duration-150">
          Creators
        </Link>
        {#if $authStore.isAuthenticated}
          <button on:click={handleSignOut} class="text-gray-300 hover:text-white transition duration-150">
            Sign out
          </button>
        {:else}
          <Link to="/SignIn" class="text-gray-300 hover:text-white transition duration-150">
            Sign In
          </Link>
        {/if}
<!--    TODO: Needs to change to "my profile" and link to profile page -->
        <Link to="/SignUp" class="
            bg-gradient-to-r 
            from-[#EB7548] to-[#F5AE55] 
            hover:from-[#E16538] hover:to-[#E59E45] 
            text-black font-medium py-2 px-4 rounded-lg shadow-lg 
            transition 
            duration-150
            cursor-pointer
          ">
            Join Now
        </Link>
      </div>
    </div>
  </div>
</nav>