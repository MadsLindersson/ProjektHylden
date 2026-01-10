export function handleProfileImageError(event) {
    const img = event.currentTarget;
    if (img instanceof HTMLImageElement) {
        img.src = "/defaultProfile.png";
    }
}

export function handlePostImageError(event) {
    const img = event.currentTarget;
    if (img instanceof HTMLImageElement) {
        img.src = "/defaultPost.png";
    }
}
