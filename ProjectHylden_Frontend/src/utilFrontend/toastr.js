import toastr from "toastr";
import "toastr/build/toastr.min.css";

export function resetMailSendNotification(email) {
    if (!email.includes("@") || !email.includes(".")) {
        toastr.error("Is not an email adress, please enter a valid email adress", email);
    } else {
        toastr.success(email, "A mail has been sent to:");
    }
}

export function signOutNotification(hasSignedOut) {
    if (hasSignedOut) {
        toastr.success("Signed out");
    } else {
        toastr.error("Sign out failed");
    }
}

export function signInNotification(hasSignedIn) {
    if (hasSignedIn) {
        toastr.success("Signed in");
    } else {
        toastr.error("Sign in failed");
    }
}

export function accountCreated(hasCreated) {
    if (hasCreated) {
        toastr.success("Account created!");
    } else {
        toastr.error("Account creation failed");
    }
}

export function profileUpdated(hasUpdated) {
    if (hasUpdated) {
        toastr.success("Profile updated!");
    } else {
        toastr.error("Profile updating failed");
    }
}

export function userUpdated(hasUpdated) {
    if (hasUpdated) {
        toastr.success("User updated!");
    } else {
        toastr.error("User Updating failed");
    }
}

export function userDeleted(hasDeleted) {
    if (hasDeleted) {
        toastr.success("User deleted!");
    } else {
        toastr.error("User deletion failed");
    }
}

export function postDeleted(hasDeleted) {
    if (hasDeleted) {
        toastr.success("Post deleted!");
    } else {
        toastr.error("Post deletion failed");
    }
}

export function imageDeleted(hasDeleted) {
    if (hasDeleted) {
        toastr.success("Image deleted!");
    } else {
        toastr.error("Image deletion failed");
    }
}

export function postCreated(hasCreated) {
    if (hasCreated) {
        toastr.success("Post created!");
    } else {
        toastr.error("Post creation failed");
    }
}

export function postLiked(message) {
    toastr.success(message);
}

export function pwNotAMatch() {
    toastr.error("Passwords do not match!");
}

export function somethingWentWrong() {
    toastr.error("Something went wrong");
}

export function emailOrUsernameExists() {
    toastr.error("Email or username already already exists, sign in with your account!");
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true, // Adds a nice timer line at the bottom
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
