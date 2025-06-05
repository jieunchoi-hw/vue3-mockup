export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@example.com',
    role: 'admin',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: '이영희',
    email: 'lee@example.com',
    role: 'user',
    createdAt: '2024-01-03'
  }
]
