import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function resetMailSendNotification(email) {
  if (!email.includes("@") || !email.includes(".")) {
    toastr.error(
      "Is not an email adress, please enter a valid email adress",
      email
    );
  } else {
    toastr.success(email, "A mail has been sent to:");
  }
}

export function signOutNotification (hasSignedOut)  {
  if (hasSignedOut) {
    toastr.success("Signed out");
  } else {
    toastr.error("Sign out failed");
  }
}

export function signInNotification (hasSignedIn)  {
    if (hasSignedIn) {
      toastr.success("Signed in");
  } else {
      toastr.error("Sign in failed");
  }
}

export function accountCreated (hasCreated)  {
    if (hasCreated) {
      toastr.success("Account created!");
  } else {
      toastr.error("Account creation failed");
  }
}

export function profileUpdated (hasCreated)  {
    if (hasCreated) {
      toastr.success("Profile updated!");
  } else {
      toastr.error("Profile updating failed");
  }
}

export function userUpdated (hasCreated)  {
    if (hasCreated) {
      toastr.success("User updated!");
  } else {
      toastr.error("User Updating failed");
  }
}

export function postCreated (hasCreated)  {
    if (hasCreated) {
      toastr.success("Post created!");
  } else {
      toastr.error("Post creation failed");
  }
}

export function pwNotAMatch ()  {
  toastr.error("Passwords do not match!");
}

export function somethingWentWrong () {
  toastr.error("Something went wrong");
}

export function emailOrUsernameExists ()  {
  toastr.error("Email or username already already exists, sign in with your account!");
}

toastr.options = {
    "positionClass": "toast-bottom-right"
};