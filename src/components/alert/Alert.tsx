import Swal from 'sweetalert2';
const errorAlert = (
  text = 'You dont have permission to visit this page!',
  title = 'Permission Denied!',
  showConfirmButton = true,
  timer = 2000,
) => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    showConfirmButton,
    confirmButtonText: text,
    timer,
  });
};

const successfullAlert = (title = 'Your work has been saved', timer = 2000) => {
  return Swal.fire({
    icon: 'success',
    title,
    showConfirmButton: true,
    timer,
  });
};

const dimissionReasonTimer = Swal.DismissReason.timer;
export { dimissionReasonTimer, errorAlert, successfullAlert };
