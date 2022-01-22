import toast from 'react-hot-toast';

const toastify = message => {
  toast.success(message, {
    style: {
      border: '1px solid #99f2f5',
      padding: '16px',
      color: '#713200',
    },
    iconTheme: {
      primary: '#99f2f5',
      secondary: '#FFFAEE',
    },
  });
};

export default toastify;
