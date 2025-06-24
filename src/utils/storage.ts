import { jwtDecode } from "jwt-decode";

// Storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN: "jwtToken",
  USER_DETAILS: "userDetails",
  REMEMBER_ME: "votr_auth"
} as const;

// Types
export interface UserDetails {
  userId: string;
  fullName: string;
  email: string;
  brokerId: string;
  roleId: string;
  roleName: string;
  iat: number;
  exp: number;
}

export interface RememberMeData {
  email: string;
  remember: boolean;
}

// Storage service class
class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Generic getter with type safety
  private getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error);
      return null;
    }
  }

  // Generic setter with type safety
  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error);
    }
  }

  // Token methods
  public getToken(): string | null {
    const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    if (!token) return null;

    try {
      const decoded = jwtDecode<UserDetails>(token);
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        this.clearAuth();
        return null;
      }
      return token;
    } catch (error) {
      console.error("Error decoding token:", error);
      this.clearAuth();
      return null;
    }
  }

  public setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
  }

  // User details methods
  public getUserDetails(): UserDetails | null {
    const userDetails = this.getItem<UserDetails>(STORAGE_KEYS.USER_DETAILS);
    if (!userDetails) return null;

    if (userDetails.exp * 1000 < Date.now()) {
      this.clearAuth();
      return null;
    }

    return userDetails;
  }

  public setUserDetails(user: UserDetails): void {
    this.setItem(STORAGE_KEYS.USER_DETAILS, user);
  }

  // Remember me methods
  public getRememberMeData(): RememberMeData | null {
    return this.getItem<RememberMeData>(STORAGE_KEYS.REMEMBER_ME);
  }

  public setRememberMeData(data: RememberMeData): void {
    this.setItem(STORAGE_KEYS.REMEMBER_ME, data);
  }

  // Clear methods
  public clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
  }

  public clearRememberMe(): void {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  }

  public clearAll(): void {
    this.clearAuth();
    this.clearRememberMe();
  }
}

// Export a singleton instance
export const storageService = StorageService.getInstance(); 