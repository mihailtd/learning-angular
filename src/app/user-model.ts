export class UserModel {
  email: String = null
  gender: String = null
  login: {
    username: String,
    password: String
  }
  picture: {
    thumbnail: String
  }
  dob: string = null
}

export const genders: String[] = ['unspecified', 'male', 'female']