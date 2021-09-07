import axios from 'axios';
const sendRes = (responseUrl: string, message: string) => {
  if (!message) return;
  axios.post(responseUrl, {
    text: message,
  });
};
export { sendRes };
