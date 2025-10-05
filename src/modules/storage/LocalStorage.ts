/**
 * LocalStorage Implementation
 * Client-side storage using browser's localStorage API
 */

import { singleton } from "tsyringe";
import type { LocalStorageInterface } from "./LocalStorageInterface";

@singleton()
export class LocalStorageService implements LocalStorageInterface {
  constructor(private readonly storage: Storage) {}

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
