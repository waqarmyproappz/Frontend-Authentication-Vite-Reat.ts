// export interface RegisterForm {
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   repeatPassword: string;
//   termsAccepted: boolean;
// }


// src/types/UserForms.ts

// types/UserForms.ts

export interface BaseUserForm {
  username: string;
  name: string;
  email: string;
}

export interface RegisterForm extends BaseUserForm {
  password: string;
  repeatPassword: string;
  termsAccepted: boolean;
}

export interface UpdateProfileForm extends BaseUserForm {
  _id: string;
  password: string;
}

