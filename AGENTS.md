# AGENTS.md - Instructions for AI Agents

## Project Overview

This is a **Spotify Playlist Generator** that processes local audio files, extracts metadata, and creates Spotify playlists based on the user's local music library.

### Core Workflow
1. User selects/uploads local audio files (MP3, FLAC, WAV, etc.)
2. Extract metadata (artist, album, track name, year, etc.) from audio files
3. Search Spotify API for matching tracks
4. Present matches for user review and confirmation
5. Create/update Spotify playlists with matched tracks

---

## Tech Stack

### Framework & Runtime
- **Next.js 15** - App Router architecture
- **React 19** - Latest React with Server Components
- **TypeScript 5** - Strict typing enabled
- **Turbopack** - Build tool (faster than Webpack)

### Tools & Libraries
- **Biome** - Linting and formatting (NOT ESLint/Prettier)
- **CSS Modules** - Component-scoped styling

### Future Dependencies (to be added)
- Audio metadata extraction library (e.g., `music-metadata-browser`, `jsmediatags`)
- Spotify Web API client
- OAuth authentication library

---

## Project Structure

**See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture documentation.**

### Quick Overview

```
src/
  app/                    # Next.js App Router
    layout.tsx           # Root layout
    page.tsx             # Home page
    globals.css          # Global styles
    api/                 # API Routes (server-side)
      spotify/           # Spotify API endpoints
  
  services/              # Core business logic (modular services)
    api/                 # API Base Service - HTTP client
    token/               # Token Manager - OAuth token handling
    storage/             # Storage Service - Data persistence (localStorage)
    spotify/             # Spotify API Service - Spotify integration
  
  components/            # React UI components (to be added)
  hooks/                 # Custom React hooks (to be added)
  lib/                   # Shared utilities
  types/                 # Shared TypeScript types
```

### Service Architecture

Each service has **single responsibility**:
- **API Service**: HTTP communication, retry logic, error handling
- **Token Manager**: OAuth tokens, auto-refresh, validation
- **Storage Service**: Abstract persistence layer (localStorage initially)
- **Spotify Service**: Spotify API methods (search, playlist creation)

Services are **loosely coupled** and can be tested independently.

---

## Development Guidelines

### Code Style
- Use **functional components** with hooks
- Prefer **TypeScript strict typing** - avoid `any`
- Use **meaningful variable names** that describe the data

### Next.js App Router Patterns
- **Server Components by default** - Only add `'use client'` when necessary
- Use `'use client'` for:
  - File upload/handling
  - Browser APIs (FileReader, etc.)
  - Interactive UI components with state/effects
  - Event handlers
- **Server Components** for:
  - Spotify API calls (keep tokens secure)
  - Data fetching
  - Static content

### File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `FileUploader.tsx`)
- **Pages**: `page.tsx`, `layout.tsx` (Next.js convention)
- **Services**: `camelCaseService.ts` (e.g., `tokenManager.ts`, `apiClient.ts`)
- **Types**: `types.ts` in each service/module folder
- **Exports**: `index.ts` for public API exports
- **CSS Modules**: `ComponentName.module.css`
- **Constants**: `UPPER_SNAKE_CASE` for constants

---

## Architecture Principles

### Modular Service Architecture
- **Single Responsibility**: Each service has one clear purpose
- **Loose Coupling**: Services depend on abstractions, not implementations
- **Interface-based**: Clean public APIs via `index.ts` exports
- **Testable**: Services can be tested in isolation
- **Expandable**: Easy to add new services or swap implementations

### Server-Side API Calls
- **Spotify API calls MUST be server-side**
- Protect access tokens and client secrets
- Use Next.js API routes or Server Actions
- Implement rate limiting and error handling

### Service Organization
- Each service folder contains: `types.ts`, service files, `index.ts`
- Only export what other services need via `index.ts`
- Internal helpers stay private within the service
- Use dependency injection for service dependencies

### Data Flow Pattern
```
User's Computer (Client)          Your Server              Spotify API
     │                                 │                        │
     ├─── Select Files ───────────────→│                        │
     │                                 │                        │
     ├─── Extract Metadata ────────────┤                        │
     │    (client-side)                │                        │
     │                                 │                        │
     ├─── Send Metadata ──────────────→│                        │
     │                                 │                        │
     │                                 ├─── Search Tracks ─────→│
     │                                 │                        │
     │                                 │←─── Results ───────────┤
     │                                 │                        │
     │←─── Show Matches ───────────────┤                        │
     │                                 │                        │
     ├─── Confirm Selection ──────────→│                        │
     │                                 │                        │
     │                                 ├─── Create Playlist ───→│
     │                                 │                        │
     │←─── Success! ────────────────────┤                        │
```

---

## Spotify API Integration

### Authentication
- Implement **OAuth 2.0 Authorization Code Flow**
- Store tokens securely (server-side sessions or encrypted cookies)
- Handle token refresh automatically
- Required scopes: `playlist-modify-public`, `playlist-modify-private`

### Key Endpoints
- **Search**: `GET /v1/search` - Find tracks by metadata
- **Create Playlist**: `POST /v1/users/{user_id}/playlists`
- **Add Tracks**: `POST /v1/playlists/{playlist_id}/tracks`
- **User Profile**: `GET /v1/me` - Get current user info

### Rate Limiting
- Respect Spotify's rate limits (429 responses)
- Implement exponential backoff
- Batch requests where possible
- Show progress to user for long operations

### Error Handling
- Handle unmatched tracks gracefully
- Provide fallback search strategies
- Allow manual track selection for ambiguous matches
- Log API errors for debugging

---

## Metadata Extraction

### Supported Formats
- MP3 (ID3v1, ID3v2)
- FLAC
- M4A/AAC
- OGG Vorbis
- WAV (if metadata present)

### Key Metadata Fields
- **Title** - Track name
- **Artist** - Primary artist
- **Album** - Album name
- **Album Artist** - Album-level artist
- **Year** - Release year
- **Track Number** - Position in album
- **Genre** - Music genre
- **Duration** - Track length

### Matching Strategy
1. **Exact match**: `artist + track name`
2. **Fuzzy match**: Handle variations in spelling, punctuation
3. **Album context**: Use album name to disambiguate
4. **Year filter**: Prefer tracks from matching year
5. **Duration check**: Compare track lengths (±5 seconds tolerance)
6. **Confidence scoring**: Rate match quality (high/medium/low)

---

## User Experience Guidelines

### File Upload
- Support drag-and-drop
- Support folder selection (for bulk import)
- Show upload progress
- Display file count and total size
- Allow filtering by format

### Progress Tracking
- Show metadata extraction progress
- Display Spotify search progress
- Indicate matched vs unmatched tracks
- Allow pausing/canceling long operations

### Match Review
- Show confidence scores for matches
- Display side-by-side comparison (local vs Spotify)
- Allow manual override/selection
- Preview tracks before adding to playlist
- Handle duplicates intelligently

### Error States
- Clear error messages for failed matches
- Suggest alternatives for unmatched tracks
- Provide retry options
- Export list of unmatched tracks

---

## Security & Privacy

### Data Protection
- **Never upload audio files** to server or third parties
- Process all audio data client-side only
- Only send metadata (text) to server
- Clear file data from memory after processing

### Token Management
- Store Spotify tokens server-side
- Use HTTP-only cookies for session management
- Implement CSRF protection
- Rotate tokens regularly
- Clear tokens on logout

## Testing Checklist

### Before Committing
- [ ] Run `npm run lint` - No linting errors
- [ ] Run `npm run format` - Code is formatted
- [ ] Test with different audio formats (MP3, FLAC, etc.)
- [ ] Test with files missing metadata
- [ ] Test with large batches (50+ files)
- [ ] Verify Spotify API error handling
- [ ] Check for memory leaks with large files
- [ ] Test OAuth flow (login/logout)

### Edge Cases to Handle
- Files with no metadata
- Files with partial metadata
- Very long filenames or metadata
- Special characters in track/artist names
- Multiple artists (featuring, vs, &, etc.)
- Live versions, remixes, remasters
- Compilation albums
- Duplicate tracks in playlist

---

## Common Pitfalls

### ❌ Don't
- Upload audio files to the server
- Use `any` type in TypeScript
- Hardcode Spotify credentials
- Ignore rate limiting
- Make Spotify API calls from client
- Use ESLint or Prettier (use Biome)
- Assume all files have metadata
- Create playlists without user confirmation

### ✅ Do
- Process audio files client-side
- Use proper TypeScript types
- Store credentials in environment variables
- Implement retry logic with backoff
- Use Server Actions or API routes for Spotify
- Use Biome for linting/formatting
- Handle missing metadata gracefully
- Show preview before creating playlist

---

## Helpful Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Spotify Web API Reference](https://developer.spotify.com/documentation/web-api)
- [React 19 Docs](https://react.dev)
- [Biome Documentation](https://biomejs.dev)
- [File API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/File_API)

---

## Notes for AI Agents

- This project is in **early stages** - infrastructure may not be fully built yet
- Prioritize **user privacy** - audio files stay on user's device
- Focus on **robust error handling** - many edge cases with metadata
- Think about **UX** - batch operations can take time, show progress
- Consider **performance** - processing many large files can be slow
- Plan for **scalability** - users may have thousands of tracks

---

**Last Updated**: October 5, 2025
