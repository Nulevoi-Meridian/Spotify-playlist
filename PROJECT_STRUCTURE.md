# Project Structure

## Overview
This document describes the modular architecture for the Spotify Playlist Generator. We start with a minimal base structure that can be expanded as needed.

---

## Base Structure (Phase 1 - Current)

```
src/
├── app/                          # Next.js App Router (UI/Pages)
│   ├── layout.tsx
│   ├── page.tsx                  # Main landing page
│   ├── globals.css
│   └── api/                      # API Routes (server-side endpoints)
│       └── spotify/
│           ├── auth/             # Authentication endpoints
│           ├── search/           # Search tracks endpoint
│           └── playlist/         # Playlist operations endpoint
│
├── modules/                     # Core service modules (business logic)
│   ├── api/                      # API Base Service
│   │   ├── types.ts              # API-related types
│   │   ├── apiClient.ts          # Base HTTP client with retry logic
│   │   ├── errorHandler.ts       # Centralized error handling
│   │   └── index.ts              # Public API exports
│   │
│   ├── token/                    # Token Manager Service
│   │   ├── types.ts              # Token-related types
│   │   ├── tokenManager.ts       # Manage Spotify tokens (refresh, validate)
│   │   ├── tokenStorage.ts       # Token persistence layer
│   │   └── index.ts              # Public API exports
│   │
│   ├── storage/                  # Storage Service
│   │   ├── types.ts              # Storage-related types
│   │   ├── baseStorage.ts        # Abstract storage interface
│   │   ├── localStorage.ts       # LocalStorage implementation
│   │   ├── storageFactory.ts     # Factory to switch storage types
│   │   └── index.ts              # Public API exports
│   │
│   └── spotify/                  # Spotify API Service
│       ├── types.ts              # Spotify API types
│       ├── spotifyClient.ts      # Spotify-specific API methods
│       ├── auth.ts               # OAuth flow logic
│       └── index.ts              # Public API exports
│
├── components/                   # React components
│   └── (to be added as needed)
│
├── hooks/                        # Custom React hooks
│   └── (to be added as needed)
│
├── lib/                          # Shared utilities
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Helper functions
│
└── types/                        # Shared TypeScript types
    └── index.ts                  # Common types across the app
```

---

## Service Descriptions

### 1. **API Base Service** (`services/api/`)
**Single Responsibility**: Handle all HTTP communication with external APIs

**Key Features:**
- Base HTTP client (fetch wrapper)
- Request/response interceptors
- Automatic retry logic with exponential backoff
- Timeout handling
- Error normalization
- Request cancellation support

**Does NOT:**
- Know about Spotify specifics
- Handle token logic
- Store data

**Example Usage:**
```typescript
// Other services use this as foundation
const response = await apiClient.get(url, options);
const data = await apiClient.post(url, body, options);
```

---

### 2. **Token Manager Service** (`services/token/`)
**Single Responsibility**: Manage Spotify OAuth tokens

**Key Features:**
- Store access token and refresh token
- Validate token expiration
- Automatically refresh expired tokens
- Provide valid token for API requests
- Clear tokens on logout
- Use Storage Service for persistence

**Does NOT:**
- Make Spotify API calls (except token refresh)
- Handle OAuth redirect flow (that's in API routes)
- Store non-token data

**Example Usage:**
```typescript
// Get a valid token (auto-refresh if needed)
const token = await tokenManager.getValidToken();

// Store new tokens after OAuth
await tokenManager.setTokens({ access, refresh, expiresIn });

// Clear on logout
await tokenManager.clearTokens();
```

---

### 3. **Storage Service** (`services/storage/`)
**Single Responsibility**: Abstract data persistence layer

**Key Features:**
- Generic key-value storage interface
- Multiple implementations (localStorage for now)
- Can expand to: sessionStorage, IndexedDB, cookies, server-side storage
- Type-safe storage/retrieval
- Error handling for storage failures
- Storage quota management

**Does NOT:**
- Know what data it's storing (business logic agnostic)
- Make API calls
- Handle tokens directly (Token Manager uses this)

**Example Usage:**
```typescript
// Store data
await storage.set('key', value);

// Retrieve data
const value = await storage.get<Type>('key');

// Remove data
await storage.remove('key');

// Clear all
await storage.clear();
```

**Future Expansion:**
```typescript
// Can switch storage type via factory
const storage = StorageFactory.create('localStorage');  // Current
const storage = StorageFactory.create('indexedDB');     // Future
const storage = StorageFactory.create('secure');        // Future (encrypted)
```

---

### 4. **Spotify API Service** (`services/spotify/`)
**Single Responsibility**: Interface with Spotify Web API

**Key Features:**
- Use API Base Service for HTTP calls
- Use Token Manager for authentication
- Spotify-specific methods (search, createPlaylist, etc.)
- Response type mapping
- Rate limit handling

**Does NOT:**
- Handle tokens directly (delegates to Token Manager)
- Make raw HTTP calls (uses API Base Service)
- Process audio files

**Example Usage:**
```typescript
// Search for tracks
const results = await spotifyService.searchTrack(artist, title);

// Create playlist
const playlist = await spotifyService.createPlaylist(name, tracks);
```

---

## Service Dependencies

```
┌─────────────────────────┐
│   Spotify API Service   │
│  (high-level methods)   │
└───────────┬─────────────┘
            │
            ├─────────────────────────┐
            │                         │
            ▼                         ▼
┌─────────────────────┐   ┌──────────────────────┐
│  Token Manager      │   │   API Base Service   │
│  (auth logic)       │   │   (HTTP client)      │
└──────────┬──────────┘   └──────────────────────┘
           │
           ▼
┌──────────────────────┐
│  Storage Service     │
│  (persistence)       │
└──────────────────────┘
```

**Key Points:**
- Services are loosely coupled
- Each service has one responsibility
- Dependencies flow downward
- Lower services don't know about upper services

---

## Future Expansion (Phase 2+)

Once base services are working, we can add:

```
services/
├── audio/                        # Audio processing service
│   ├── fileReader.ts
│   ├── metadataExtractor.ts
│   └── validator.ts
│
├── matching/                     # Track matching service
│   ├── matcher.ts
│   ├── scorer.ts
│   └── fuzzy.ts
│
└── playlist/                     # Playlist management service
    ├── builder.ts
    └── validator.ts
```

---

## Development Phases

### ✅ Phase 1: Core Services (START HERE)
1. Storage Service (localStorage)
2. API Base Service
3. Token Manager Service
4. Spotify API Service (basic methods)

### 📋 Phase 2: Audio Processing
1. Audio Service (metadata extraction)
2. File upload components
3. Metadata display

### 📋 Phase 3: Track Matching
1. Matching Service
2. Match review UI
3. Manual override capabilities

### 📋 Phase 4: Playlist Creation
1. Playlist Service
2. Batch operations
3. Progress tracking

### 📋 Phase 5: Polish
1. Error handling UI
2. Offline support
3. Performance optimization

---

## File Structure Example

Each service follows this pattern:

```
services/example/
├── types.ts              # TypeScript interfaces/types
├── exampleService.ts     # Main service class/functions
├── helpers.ts            # Internal helper functions (optional)
├── constants.ts          # Service-specific constants (optional)
└── index.ts              # Public exports only
```

**`index.ts` pattern:**
```typescript
// Only export what other services need
export { ExampleService } from './exampleService';
export type { ExampleConfig, ExampleResult } from './types';

// Internal helpers are NOT exported
```

---

## Naming Conventions

- **Services**: `camelCaseService.ts` (e.g., `tokenManager.ts`, `apiClient.ts`)
- **Types**: `types.ts` in each service folder
- **Exports**: `index.ts` in each service folder
- **Classes**: `PascalCase` (e.g., `class ApiClient`, `class TokenManager`)
- **Functions**: `camelCase` (e.g., `getValidToken()`, `refreshToken()`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `TOKEN_STORAGE_KEY`)

---

## Key Principles

1. **Single Responsibility** - One service = one concern
2. **Dependency Injection** - Services receive dependencies, don't create them
3. **Interface-based** - Services expose clean interfaces
4. **Testable** - Each service can be tested independently
5. **Expandable** - Easy to add new services or implementations
6. **Type-safe** - Full TypeScript coverage

---

**Last Updated**: October 5, 2025
