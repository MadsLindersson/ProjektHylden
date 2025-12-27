import { writable } from 'svelte/store';

const initialUser = {
    isAuthenticated: false,
    userId: null,
    statusChecked: false
};

export const authStore = writable(initialUser);

export const login = (userId, userRole) => {
    authStore.set({
        isAuthenticated: true,
        userId: userId,
        userRole: userRole,
        statusChecked: true,
    });
};

export const clientLogout = () => {
    authStore.set(initialUser);
};

export async function checkAuthStatus() {
        const response = await fetch('http://localhost:8080/status', { credentials: 'include' });
        const data = await response.json();

        if (data.isAuthenticated) {
            login(data.userId, data.userRole);
        } else {
            authStore.update(state => ({
                ...state,
                isAuthenticated: false,
                statusChecked: true
            }));
        }
    }