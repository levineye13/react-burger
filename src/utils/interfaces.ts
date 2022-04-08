export interface IUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly image: string;
  readonly price: number;
  readonly type: string;
  readonly onClick: () => void;
  readonly handleDelete: () => void;
}

export interface ICookie {
  set(name: string, value: string, options?: {}): void;
  get(name: string): string | undefined;
  delete(name: string): void;
}

export interface IApi {
  readonly baseUrl: string;
  readonly options?: {
    headers?: {};
    schemaType?: string;
  };
  login(): Promise<IUser>;
  register(): Promise<IUser>;
  logout(): object;
  getUser(): Promise<IUser>;
  updateUser(): Promise<IUser>;
  restorePassword(): object;
  resetPassword(): object;
  refreshToken(): object;
}
