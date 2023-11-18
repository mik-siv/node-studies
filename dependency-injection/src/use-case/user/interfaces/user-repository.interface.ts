export interface UserRepositoryInterface {
    create(user: string): number

    findAll(): string[]

    find(user: string): string | null

    update(user: string, updatedUser: string): string | null

    delete(user: string): void | null
}