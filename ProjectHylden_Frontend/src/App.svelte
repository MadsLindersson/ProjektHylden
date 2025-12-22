<script>
  import { Router, Route } from 'svelte-routing';
  import { checkAuthStatus } from './utilFrontend/stores/authStore.js';

  import MainPage from './components/MainPage'
  import SignIn from './components/SignIn';
  import SignUp from './components/SignUp';
  import Creators from './components/Creators';
  import Profile from './components/Profile';
  import CreatePost from './components/CreatePost';
  import EditProfile from './components/EditProfile';
  import ProtectedRoute from './components/ProtectedRoute';

  $effect(() => {
    checkAuthStatus();
  });

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

    <Route path="/profile/:userId" let:params>
      <Profile userId = {params.userId}/>
    </Route>
    
    <Route path="/createpost">
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    </Route>

    <Route path="/editprofile/:userId" let:params>
      <ProtectedRoute>
        <EditProfile userId = {params.userId}/>
      </ProtectedRoute>
    </Route>

  </Router>
</main>

