<script>
  import { Router, Route } from 'svelte-routing';
  import { onMount } from 'svelte';

  import { checkAuthStatus } from './utilFrontend/stores/authStore.js';

  import MainPage from './components/MainPage'
  import SignIn from './components/SignIn';
  import SignUp from './components/SignUp';
  import Creators from './components/Creators';
  import Profile from './components/Profile';

  onMount(checkAuthStatus);

</script>

<main class="bg-gradient-to-r from-[#0B0A09] to-[#1C1715] min-h-screen">
  <Router>
    
    <Route path="/">
      <MainPage />
    </Route>

    <Route path="/SignIn">
      <SignIn />
    </Route>

    <Route path="/SignUp">
      <SignUp />
    </Route>

    <Route path="/Creators">
      <Creators />
    </Route>

    <Route path="/Profile">
      <Profile />
    </Route>

  </Router>
</main>

