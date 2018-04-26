import { UserModel } from "./user-model";

export class BookModel {
    id: String = null
    title: String = null
    author: String = null
    tags: String[] = []
    users: UserModel[] = []
}

export const tags: String[] = ['nodejs', 'ux/ui', 'design', 'databases']