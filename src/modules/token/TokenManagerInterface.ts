export interface TokenManagerInterface {
  setToken: (token: string) => void;
  getToken: () => string | null;
  hasToken: () => boolean;
  isTokenExpired: () => boolean;
}
