
export type UserDetails = {
  email: string;
};

export type CreateUserParams = {
  email: string;
  password: string;
};

export type UpdateUserParams = {
  email: string;
  password: string;
};

export type EmailParams = {
  to: string;
  subject: string;
  text?: string;
  html: string;
}
