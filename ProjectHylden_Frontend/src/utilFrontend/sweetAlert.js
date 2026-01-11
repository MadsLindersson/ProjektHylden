import Swal from 'sweetalert2';

export async function confirmDelete() {
    return await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        iconColor: '#ff3e00',
        
        background: '#1C1715',
        color: '#ffffffff',
        showCancelButton: true,
        confirmButtonColor: '#009d22',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        
        heightAuto: false,
        backdrop: `rgba(0,0,12,0.4)`,
        customClass: {
            popup: 'rounded-modal',
            title: 'font-bold'
        }
    });
}