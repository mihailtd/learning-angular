export class UserModel {
  email: String = null
  gender: String = null
  login = {
    username: null,
    password: null
  }
  dob: Date = null
}

export const genders: String[] = ['Unspecified', 'Male', 'Female']