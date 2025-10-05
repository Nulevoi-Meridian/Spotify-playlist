/**
 * Token Manager Service
 * Manages Spotify OAuth tokens (access, refresh, expiration)
 *
 */

import type { LocalStorageInterface } from "../storage/LocalStorageInterface";
import type { TokenManagerInterface } from "./TokenManagerInterface";

export class TokenManager implements TokenManagerInterface {
  constructor(private readonly storage: LocalStorageInterface) {}

  async setToken(token: string): void {
    // Implementation here
  }

  async getToken(): string | null {
    // Implementation here
  }

  async hasToken(): boolean {
    // Implementation here
  }

  async isTokenExpired(): boolean {
    // Implementation here
  }
}
