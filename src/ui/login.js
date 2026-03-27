import createRequest from '../api/createRequest';
import getFormData from '../api/getFormData';

export default function login(event, navigate) {
  event.preventDefault();
  const { currentTarget } = event;
  const data = getFormData(currentTarget);

  createRequest({
    url: 'login',
    method: 'POST',
    headers: {
      'Content-Type': 'applicaton/json'
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.success) {
      localStorage.setItem('user', data.login);
      navigate('/admin');
    } else {
      alert(response.error);
    }
  });

  currentTarget.reset();
};