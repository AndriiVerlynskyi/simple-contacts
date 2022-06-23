import http from "../http";
import { baseUrl } from "../constants/const";

export const getContacts = params => {
  return http.get(`${baseUrl}/users`, {quantity: 5, ...params})
};

export const getUserById = id => {
  return http.get(`${baseUrl}/userbyid/${id}`)
};

export const addContant = data => {
  return http.post(`${baseUrl}/adduser`, data)
};

export const deleteContact = id => {
  return http.delete(`${baseUrl}/deleteuser/${id}`)
};

export const updateUser = user => {
  return http.put(`${baseUrl}/updateuser/${user.id}`, user)
};
