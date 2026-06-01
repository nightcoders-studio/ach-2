import { UserRole } from "@/types";

/**
 * Access levels hierarchy for RBAC (Role-Based Access Control).
 * Higher numbers represent higher privilege levels.
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 4,
  [UserRole.OWNER]: 3,
  [UserRole.STAFF]: 2,
  [UserRole.CUSTOMER]: 1,
};

/**
 * Validates if the user's role meets the minimum required role.
 */
export function hasRequiredRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Maps user roles to their respective dashboard or landing path.
 */
export const ROLE_ROUTES: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: "/admin",
  [UserRole.OWNER]: "/owner",
  [UserRole.STAFF]: "/staff",
  [UserRole.CUSTOMER]: "/customer",
};
