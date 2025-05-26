// // // src/api/authApi.ts
// // import axios from "axios";
// // const BASE = "https://buildproduct.free.beeceptor.com/api/users";

// // export const register = (userData: {
// //   fullName: string;
// //   email: string;
// //   password: string;
// // }) => axios.post(BASE, userData);

// // export const login = (credentials: { email: string; password: string }) =>
// //   axios.post(BASE, credentials);

// import axios from "axios";

// const BASE = "https://buildproduct.free.beeceptor.com/api/users";

// export interface SigninCredentials {
//   email: string;
//   password: string;
// }

// export const login = (credentials: SigninCredentials) =>
//   axios.post<unknown>(BASE, credentials);

// export interface SignupCredentials {
//   fullName: string;
//   email: string;
//   password: string;
// }

// export const register = (userData: SignupCredentials) =>
//   axios.post(BASE, userData);

import axios from "axios";

const BASE = "https://buildproduct.free.beeceptor.com/api/users";

export interface UserRecord {
  id: string;
  fullName?: string;
  email: string;
  password: string;
}

// Fetch all users
export const fetchUsers = () => axios.get<UserRecord[]>(BASE);

// Register a new user
export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}
export const register = (userData: SignupCredentials) =>
  axios.post(BASE, userData);
