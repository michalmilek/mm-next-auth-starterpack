# How Authentication Works

Authentication system is set up using NextAuth.js with a credentials provider. Here's a comprehensive breakdown of how it works:

## 1. Authentication Flow

### Registration

1. User visits `/auth/register` and fills out the registration form.
2. The form submits data to the `auth.register` tRPC mutation.
3. The mutation:
   - Checks if a user with that email already exists.
   - Hashes the password using bcrypt.
   - Creates a new user in the database with the hashed password.
   - Returns the user data (without the password).
4. User is redirected to the login page.

### Login

1. User visits `/auth/login` and enters credentials.
2. The form calls `signIn("credentials", {...})` from NextAuth.js.
3. NextAuth.js calls the `authorize` function in your auth config.
4. The `authorize` function:
   - Finds the user by email.
   - Verifies the password using bcrypt's `compare` function.
   - Returns the user if credentials are valid, or `null` if not.
5. If successful, NextAuth.js:
   - Creates a JWT token with the user's ID.
   - Sets a session cookie.
   - Redirects to the home page.

### Session Management

- The `SessionProvider` in app makes the session available throughout your app.
- Components can access the session using the `useSession` hook.
- The `AuthStatus` component shows different UI based on authentication state:
  - Loading state while checking authentication.
  - User info and sign out button when logged in.
  - Sign in and register links when not logged in.

## 2. Key Components

### Server-Side

- `auth/config.ts`: Configures NextAuth.js with credentials provider, JWT strategy, and callbacks.
- `auth/index.ts`: Exports the NextAuth.js instance and handlers.
- `api/auth/[...nextauth]/route.ts`: Exports the API route handlers for NextAuth.js.
- `api/routers/auth.ts`: Contains the tRPC router with the `register` mutation.

### Client-Side

- `Providers.tsx`: Client component wrapper for `SessionProvider`.
- `AuthStatus.tsx`: Shows authentication status and user info.
- `LoginForm.tsx`: Handles login form submission.
- `RegisterForm.tsx`: Handles registration form submission.

## 3. Security Features

- Passwords are hashed using bcrypt before storage.
- JWT strategy for session management.
- Protected routes can be created using the `protectedProcedure` from tRPC.
- Error handling for invalid credentials.
- Custom cookie names with secure prefixes for enhanced security.
- CSRF protection with dedicated tokens.

## 4. How to Use Authentication in App

### Checking Authentication Status

Apply to `post.tsx`.

### Protecting API Routes

Apply to `post.tsx`.

### Server-Side Authentication Check

Apply to `post.tsx`.

## 5. Token Management

### JWT (Access Token)
- Stored in the session cookie (`michalmilek-sessiontoken`)
- Valid for 1 hour
- Contains user ID and session information
- Automatically refreshed using the session cookie
- HTTP-only and secure cookie

### Session Cookie
- Name: `michalmilek-sessiontoken`
- Valid for 7 days
- Used to refresh the JWT token
- HTTP-only and secure cookie
- Contains encrypted session information

### CSRF Token
- Name: `michalmilek-csrf-token`
- Used to prevent Cross-Site Request Forgery attacks
- Valid for the duration of the session
- HTTP-only and secure cookie
- Required for all authentication requests

### Token Refresh Process
1. User logs in → receives JWT and session cookie
2. JWT expires after 1 hour
3. NextAuth.js automatically:
   - Uses session cookie to generate new JWT
   - Updates the session cookie with new JWT
4. Process continues until session cookie expires (7 days)

## 6. Cookie Security

All authentication cookies are configured with:
- `httpOnly: true` - Prevents JavaScript access
- `secure: true` - Only sent over HTTPS
- `sameSite: 'lax'` - CSRF protection
- Custom names with secure prefixes
- Encrypted content

---

# Jak działa autentykacja

System autentykacji jest skonfigurowany przy użyciu NextAuth.js z dostawcą poświadczeń. Oto szczegółowy opis działania:

## 1. Przepływ autentykacji

### Rejestracja

1. Użytkownik odwiedza `/auth/register` i wypełnia formularz rejestracyjny.
2. Formularz wysyła dane do mutacji `auth.register` tRPC.
3. Mutacja:
   - Sprawdza, czy użytkownik o podanym emailu już istnieje.
   - Haszuje hasło używając bcrypt.
   - Tworzy nowego użytkownika w bazie danych z zahaszowanym hasłem.
   - Zwraca dane użytkownika (bez hasła).
4. Użytkownik jest przekierowany do strony logowania.

### Logowanie

1. Użytkownik odwiedza `/auth/login` i wprowadza dane logowania.
2. Formularz wywołuje `signIn("credentials", {...})` z NextAuth.js.
3. NextAuth.js wywołuje funkcję `authorize` w konfiguracji auth.
4. Funkcja `authorize`:
   - Wyszukuje użytkownika po emailu.
   - Weryfikuje hasło używając funkcji `compare` z bcrypt.
   - Zwraca użytkownika jeśli dane są poprawne, lub `null` jeśli nie.
5. Jeśli się powiedzie, NextAuth.js:
   - Tworzy token JWT z ID użytkownika.
   - Ustawia ciasteczko sesji.
   - Przekierowuje do strony głównej.

### Zarządzanie sesją

- `SessionProvider` w aplikacji udostępnia sesję w całej aplikacji.
- Komponenty mogą uzyskać dostęp do sesji używając hooka `useSession`.
- Komponent `AuthStatus` pokazuje różny interfejs w zależności od stanu autentykacji:
  - Stan ładowania podczas sprawdzania autentykacji.
  - Informacje o użytkowniku i przycisk wylogowania gdy zalogowany.
  - Linki do logowania i rejestracji gdy niezalogowany.

## 2. Główne komponenty

### Strona serwera

- `auth/config.ts`: Konfiguruje NextAuth.js z dostawcą poświadczeń, strategią JWT i callbackami.
- `auth/index.ts`: Eksportuje instancję NextAuth.js i handlery.
- `api/auth/[...nextauth]/route.ts`: Eksportuje handlery tras API dla NextAuth.js.
- `api/routers/auth.ts`: Zawiera router tRPC z mutacją `register`.

### Strona klienta

- `Providers.tsx`: Komponent opakowujący dla `SessionProvider`.
- `AuthStatus.tsx`: Pokazuje stan autentykacji i informacje o użytkowniku.
- `LoginForm.tsx`: Obsługuje wysyłanie formularza logowania.
- `RegisterForm.tsx`: Obsługuje wysyłanie formularza rejestracji.

## 3. Funkcje bezpieczeństwa

- Hasła są haszowane przed zapisem używając bcrypt.
- Strategia JWT do zarządzania sesją.
- Chronione trasy mogą być tworzone używając `protectedProcedure` z tRPC.
- Obsługa błędów dla nieprawidłowych poświadczeń.
- Niestandardowe nazwy ciasteczek z bezpiecznymi prefiksami.
- Ochrona przed CSRF z dedykowanymi tokenami.

## 4. Jak używać autentykacji w aplikacji

### Sprawdzanie stanu autentykacji

Zastosuj do `post.tsx`.

### Chronienie tras API

Zastosuj do `post.tsx`.

### Sprawdzanie autentykacji po stronie serwera

Zastosuj do `post.tsx`.

## 5. Zarządzanie tokenami

### JWT (Token dostępu)
- Przechowywany w ciasteczku sesji (`michalmilek-sessiontoken`)
- Ważny przez 1 godzinę
- Zawiera ID użytkownika i informacje o sesji
- Automatycznie odświeżany używając ciasteczka sesji
- Ciasteczko HTTP-only i secure

### Ciasteczko sesji
- Nazwa: `michalmilek-sessiontoken`
- Ważne przez 7 dni
- Używane do odświeżania tokenu JWT
- Ciasteczko HTTP-only i secure
- Zawiera zaszyfrowane informacje o sesji

### Token CSRF
- Nazwa: `michalmilek-csrf-token`
- Używany do zapobiegania atakom Cross-Site Request Forgery
- Ważny przez czas trwania sesji
- Ciasteczko HTTP-only i secure
- Wymagany dla wszystkich żądań autentykacji

### Proces odświeżania tokenów
1. Użytkownik loguje się → otrzymuje JWT i ciasteczko sesji
2. JWT wygasa po 1 godzinie
3. NextAuth.js automatycznie:
   - Używa ciasteczka sesji do wygenerowania nowego JWT
   - Aktualizuje ciasteczko sesji nowym JWT
4. Proces trwa do wygaśnięcia ciasteczka sesji (7 dni)

## 6. Bezpieczeństwo ciasteczek

Wszystkie ciasteczka autentykacji są skonfigurowane z:
- `httpOnly: true` - Zapobiega dostępowi przez JavaScript
- `secure: true` - Wysyłane tylko przez HTTPS
- `sameSite: 'lax'` - Ochrona przed CSRF
- Niestandardowe nazwy z bezpiecznymi prefiksami
- Zaszyfrowana zawartość


## AUTH CHECK:
1. client - useSession
2. server - const session = await auth();