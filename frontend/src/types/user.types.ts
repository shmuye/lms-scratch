export interface User {
    name: string,
    email: string,
    password: string,
    role: 'ADMIN' | 'READER' | 'LIBRARIAN'
}