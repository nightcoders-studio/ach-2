/**
 * KeudeKu Unified Types System
 * Highly scalable, role-based type scaffolding for F&B UMKM operations.
 */

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  OWNER = "OWNER",
  STAFF = "STAFF",
  CUSTOMER = "CUSTOMER",
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserSession {
  user: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
}
