import {UserRepositoryInterface} from "./interfaces/user-repository.interface";

export class UserRepository implements UserRepositoryInterface {
    collection: string[];

    constructor() {
        this.collection = ['Ann', 'Bob', 'Pete']
    }

    create(user: string): number {
        return this.collection.push(user)
    }

    findAll(): string[] {
        return this.collection
    }

    find(user: string): string | null {
        return this.collection.find(el => el === user) || null
    }

    update(user: string, updatedUser: string): string | null {
        let foundUserIndex = this.collection.findIndex(el => el === user);
        if (foundUserIndex !== -1) {
            this.collection[foundUserIndex] = updatedUser
            return updatedUser
        } else return null;
    }

    delete(user: string): void | null {
        let foundIndex = this.collection.findIndex(el => el === user)
        if (foundIndex !== -1) {
            this.collection.splice(foundIndex, 1);
            return;
        } else return null
    }
}