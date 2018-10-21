import axios from "axios";
const URL = "http://localhost:8000";

export const requestValidation = async ({ address }) => {
  return axios.post(`${URL}/requestValidation`, {
    address
  });
};

export const validateTheSignature = ({ address, signature }) => {
  return axios.post(`${URL}/message-signature/validate`, { address, signature });
};
