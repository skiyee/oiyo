export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

export const createUser = (user: IUser) => PetClient.request<IUser>('/user', {
  method: 'POST',
  body: user,
})
