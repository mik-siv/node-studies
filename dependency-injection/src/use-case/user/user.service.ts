import {UserRepositoryInterface} from "./interfaces/user-repository.interface";
import {UserServiceInterface} from "./interfaces/user-service.interface";

export class UserService implements UserServiceInterface {
    constructor(private readonly repository: UserRepositoryInterface) {
    }

    create(user: string): number {
        return this.repository.create(user)
    }

    delete(user: string): void | null {
        return this.repository.delete(user)
    }

    find(user: string): string | null {
        return this.repository.find(user);
    }

    update(user: string, updatedUser: string){
        return this.repository.update(user, updatedUser)
    }

    findAll(): string[] {
        return this.repository.findAll();
    }

}