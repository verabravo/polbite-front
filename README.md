# Polbite — Frontend

App móvil de nutrición personalizada con IA. Genera planes de alimentación semanales adaptados al perfil del usuario, con seguimiento biométrico y revisiones semanales con análisis de inteligencia artificial.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React Native 0.74 + Expo SDK 51 |
| Routing | Expo Router v3 (file-based) |
| Estilos | NativeWind v4 (Tailwind CSS) |
| Estado | Zustand |
| HTTP | Axios (cliente centralizado con interceptores JWT) |
| Formularios | React Hook Form + Zod |
| Iconos | Lucide React Native |
| Gráficas | Victory Native |
| Animaciones | React Native Reanimated + Moti |
| Tipografías | DM Serif Display + Outfit |
| Storage | Expo SecureStore (tokens JWT) |

## Arquitectura

Hexagonal (ports & adapters) con 4 capas:

```
src/
├── app/            # Pantallas y layouts (Expo Router)
├── application/    # Stores (Zustand) y use cases
│   ├── stores/     # Estado global por feature
│   └── useCases/   # Lógica de negocio (auth, diet, biometrics, review…)
├── domain/         # Modelos e interfaces puras (sin dependencias externas)
│   ├── models/     # Interfaces TypeScript (User, MealPlan, WeeklyReview…)
│   └── ports/      # Contratos de repositorio (AuthRepository, MealPlanRepository…)
├── infrastructure/ # Implementaciones concretas
│   ├── api/        # axiosClient.ts — interceptores de token y refresh
│   ├── repositories/ # Implementaciones de los ports (llaman a la API)
│   └── storage/    # secureStorage.ts — Expo SecureStore
├── shared/         # Utilidades, constantes, validadores, env
└── ui/             # Componentes y tema visual
    ├── components/ # Button, Input, Card, Skeleton, EmptyState, ErrorState…
    └── theme/      # colors.ts, typography.ts, spacing.ts
```

**Reglas de importación:**
- `app/` → `application/` y `ui/`
- `application/stores/` → `application/useCases/`
- `application/useCases/` → `domain/ports/`
- `infrastructure/` → `domain/ports/` + `infrastructure/api/`

## Variables de entorno

Copia `.env.example` como `.env` y ajusta los valores:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `EXPO_PUBLIC_API_BASE_URL` | URL base del backend (sin trailing slash) | `http://localhost:8000` |
| `EXPO_PUBLIC_API_TIMEOUT` | Timeout HTTP en ms | `10000` |
| `EXPO_PUBLIC_APP_ENV` | Entorno (`local` \| `dev` \| `prod`) | `local` |
| `EXPO_PUBLIC_DEBUG_NETWORK` | Logs de red en consola (`true` \| `false`) | `false` |
| `EXPO_PUBLIC_SECURE_STORE_TOKEN_KEY` | Clave de SecureStore para access token | `polbite_access_token` |
| `EXPO_PUBLIC_SECURE_STORE_REFRESH_KEY` | Clave de SecureStore para refresh token | `polbite_refresh_token` |

Archivos de entorno (no se commitean, ver `.gitignore`):
- `.env.local` — desarrollo local contra `http://localhost:8000`
- `.env.dev` — entorno de desarrollo/staging
- `.env.prod` — producción

## Desarrollo local

### Sin Docker

```bash
npm install
cp .env.example .env.local
# Edita .env.local con tu API_BASE_URL
npx expo start
```

Escanea el QR con Expo Go (iOS/Android) o abre en simulador:

```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Navegador (web preview)
```

### Con Docker

```bash
# Desarrollo con hot reload
docker compose up

# Build de producción (nginx)
docker compose --profile prod up --build
```

El modo desarrollo monta el código fuente como volumen, por lo que los cambios se reflejan en tiempo real.

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Expo dev server |
| `npm run ios` | Abrir en iOS Simulator |
| `npm run android` | Abrir en Android Emulator |
| `npm run web` | Abrir en navegador |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check sin emitir |

## Flujos de navegación

```
Splash → (tiene sesión) → Tab Dieta
       → (sin sesión)   → Login → Tab Dieta
                         → Registro → Onboarding (5 pasos) → Tab Dieta
Tab Dieta → Refinar dieta → aplicar cambios → Tab Dieta
Tab Progreso → Nuevo registro → guardar → Tab Progreso
Tab Historial → Detalle de dieta (snapshot)
Tab Historial → Revisión semanal → análisis IA → confirmar → Tab Dieta
Tab Perfil → Editar perfil | Cerrar sesión → Login
```
