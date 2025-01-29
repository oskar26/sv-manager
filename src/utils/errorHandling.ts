export const handleFirebaseError = (error: any): string => {
  if (error?.code === 'permission-denied') {
    return 'You do not have permission to access this resource. Please check your login status.';
  }
  return error?.message || 'An unexpected error occurred';
};