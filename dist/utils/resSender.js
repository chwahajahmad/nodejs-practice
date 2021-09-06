"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendRes = (res, message, status = 200) => {
    if (!res || !status || !message)
        return;
    res.status(status).json({
        text: message,
    });
};
module.exports = { sendRes };
