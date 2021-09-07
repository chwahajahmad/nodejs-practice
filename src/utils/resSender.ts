import { Response } from 'express';
const sendRes = (res: Response, message: string, status: number = 200) => {
  if (!res || !status || !message) return;
  res.status(status).json({
    text: message,
  });
};
export { sendRes };
