// src/mocks/data/users.ts - 데이터 관리
export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

// 초기 사용자 데이터
const initialUsers: User[] = [
  {
    id: 1,
    name: '김민수',
    email: 'minsu@example.com',
    role: 'admin',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@example.com',
    role: 'user',
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: '2024-03-25',
  },
]

// MSW 메모리 데이터베이스
class UserDatabase {
  private users: User[] = []
  private nextId: number = 1

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // localStorage에서 데이터 복원 시도
    const savedUsers = this.loadFromStorage()

    if (savedUsers && savedUsers.length > 0) {
      this.users = savedUsers
      this.nextId = Math.max(...savedUsers.map((u) => u.id)) + 1
      console.log('📦 사용자 데이터를 localStorage에서 복원했습니다:', savedUsers.length + '명')
    } else {
      // 초기 데이터 사용
      this.users = [...initialUsers]
      this.nextId = Math.max(...this.users.map((u) => u.id)) + 1
      this.saveToStorage()
      console.log('🆕 초기 사용자 데이터를 로드했습니다:', this.users.length + '명')
    }
  }

  private loadFromStorage(): User[] | null {
    try {
      const saved = localStorage.getItem('msw-users')
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('localStorage에서 사용자 데이터 로드 실패:', error)
      return null
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('msw-users', JSON.stringify(this.users))
    } catch (error) {
      console.warn('localStorage에 사용자 데이터 저장 실패:', error)
    }
  }

  // 모든 사용자 조회
  getAllUsers(): User[] {
    return [...this.users] // 복사본 반환
  }

  // 사용자 ID로 조회
  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  // 새 사용자 생성
  createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      id: this.nextId++,
      ...userData,
      createdAt: new Date().toISOString().split('T')[0],
    }

    this.users.push(newUser)
    this.saveToStorage()

    console.log('✅ 새 사용자 생성됨:', newUser)
    return newUser
  }

  // 사용자 업데이트
  updateUser(id: number, updates: Partial<Omit<User, 'id'>>): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return null
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    this.saveToStorage()

    console.log('🔄 사용자 업데이트됨:', this.users[userIndex])
    return this.users[userIndex]
  }

  // 사용자 삭제
  deleteUser(id: number): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return false
    }

    const deletedUser = this.users.splice(userIndex, 1)[0]
    this.saveToStorage()

    console.log('🗑️ 사용자 삭제됨:', deletedUser)
    return true
  }

  // 모든 사용자 삭제 (테스트용)
  clearAllUsers() {
    this.users = []
    this.nextId = 1
    this.saveToStorage()
    console.log('🗑️ 모든 사용자 데이터가 삭제되었습니다')
  }

  // 초기 데이터로 리셋
  resetToInitialData() {
    this.users = [...initialUsers]
    this.nextId = Math.max(...this.users.map((u) => u.id)) + 1
    this.saveToStorage()
    console.log('🔄 사용자 데이터를 초기 상태로 리셋했습니다')
  }

  // 이메일 중복 체크
  isEmailExists(email: string): boolean {
    return this.users.some((user) => user.email === email)
  }
}

// 전역 데이터베이스 인스턴스
export const userDB = new UserDatabase()
