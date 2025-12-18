<script>
  import { Router, Route } from 'svelte-routing';
  import { onMount } from 'svelte';

  import { checkAuthStatus } from './utilFrontend/stores/authStore.js';

  import MainPage from './components/MainPage'
  import SignIn from './components/SignIn';
  import SignUp from './components/SignUp';
  import Creators from './components/Creators';
  import Profile from './components/Profile';
  import CreatePost from './components/CreatePost';
  import EditProfile from './components/EditProfile';


  onMount(checkAuthStatus);

</script>

<main class="bg-gradient-to-r from-[#0B0A09] to-[#1C1715] min-h-screen">
  <Router>
    
    <Route path="/">
      <MainPage />
    </Route>

    <Route path="/signin">
      <SignIn />
    </Route>

    <Route path="/signup">
      <SignUp />
    </Route>

    <Route path="/creators">
      <Creators />
    </Route>

    <Route path="/profile/:id" let:params>
      <Profile userId = {params.id}/>
    </Route>
    
    <Route path="/createpost">
      <CreatePost />
    </Route>

    <Route path="/editprofile/:userId" let:params>
      <EditProfile userId = {params.userId}/>
    </Route>

  </Router>
</main>

