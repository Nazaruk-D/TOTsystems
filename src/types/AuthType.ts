export type LoginType = {
    email: string;
    password: string;
};

export type RegistrationType = LoginType & {
    name: string;
};
