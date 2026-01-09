<script>
    import { Link, navigate } from 'svelte-routing';
    import { authStore, clientLogout } from '../../utilFrontend/stores/authStore.js';
    import { signOutNotification } from '../../utilFrontend/toastr.js';
    import { API_URL } from '../../utilFrontend/constants.js';

   async function handleSignOut () {
      const response = await fetch(`${API_URL}/signOut`, {
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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">

      <Link to="/" class="flex items-center space-x-3 cursor-pointer group"> 
        <img 
          src="/src/assets/logo.png" 
          alt="logo" 
          class="h-10 w-auto" 
        >
        <span class="text-2xl font-bold transition duration-150 group-hover:text-gray-300">
          ProjektHylden
        </span>
      </Link>
      
      <div class="flex items-center space-x-6">
          {#if $authStore.userRole === "admin"}
            <Link to="/admin" class="text-gray-300 hover:text-white transition duration-150">
              Admin
          </Link>
          {/if}
          <Link to="/" class="text-gray-300 hover:text-white transition duration-150">
            Explore
          </Link>
          <Link to="/creators" class="text-gray-300 hover:text-white transition duration-150">
            Creators
          </Link>

        {#if $authStore.isAuthenticated}
          <button onclick={handleSignOut} class="text-gray-300 hover:text-white transition duration-150 cursor-pointer">
            Sign out
          </button>

          <Link to="/profile/{$authStore.userId}" class="inline-block transition duration-200 ease-in-out hover:scale-110 hover:opacity-80">
              <img src="/profileLogo.svg" alt="profile_logo" class="h-10 w-10">
          </Link>

        {:else}
          <Link to="/signin" class="text-gray-300 hover:text-white transition duration-150">
            Sign In
          </Link>

          <Link to="/signup" class="bg-gradient-to-r from-[#EB7548] to-[#F5AE55] hover:from-[#E16538] hover:to-[#E59E45] text-black font-medium py-2 px-4 rounded-lg shadow-lg transition duration-150 cursor-pointer">
            Join Now
          </Link>
        {/if}

      </div>
    </div>
  </div>
</nav>