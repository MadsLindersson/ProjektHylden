import { writable } from "svelte/store";
import { API_URL } from "../constantsFrontend";

const initialUser = {
    isAuthenticated: false,
    userId: null,
};

export const authStore = writable(initialUser);

export const login = (userId, userRole) => {
    authStore.set({
        isAuthenticated: true,
        userId: userId,
        userRole: userRole,
    });
};

export const clientLogout = () => {
    authStore.set(initialUser);
};

export async function checkAuthStatus() {
    const response = await fetch(`${API_URL}/status`, { credentials: "include" });
    const data = await response.json();

    if (data.isAuthenticated) {
        login(data.userId, data.userRole);
    } else {
        authStore.update((state) => ({
            ...state,
            isAuthenticated: false,
        }));
    }
}
