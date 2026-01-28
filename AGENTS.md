# CloudSquares — AGENTS.md (frontend)

## 0) TL;DR (for Codex/AI)

- Stack: **React 19 + TypeScript + Vite 7 + Tailwind CSS + shadcn/ui + SCSS**.
- Theme via CSS variables + `data-theme` (light/dark); avoid hardcoded colors.
- Icons: use **Lucide** for consistency.
- UI primitives (`src/shared/components/ui`) are **folder-per-component** in PascalCase: `Button/Button.tsx` + `Button/index.tsx`. Tests/utilities live inside the component folder.
- Use **`@` alias** → `@/*` (see `tsconfig.json` + `vite.config.ts`), **no relative deep imports**.
- **HTTP + React Query** go through `src/configs/*` wrappers only (`useAxiosQuery`, `useAxiosSuspenseQuery`, `useAxiosMutation`) and the configured axios instance.
- Reuse **`src/shared/*`** (components, hooks, utils, constants, permissions, interfaces) before writing anything new.
- Strict TS (`"strict": true`, `"noUncheckedSideEffectImports": true`) — **no `any`**.
- Every utility / custom hook must have a **Typedoc** block (params, returns, examples when useful).
- Respect existing **Vite chunk split** names; don’t randomly change `manualChunks` logic.
- Tests: **Vitest + Testing Library**; for providers use `src/providers/TestProviders.tsx`.
- Re-exports: avoid `export *` in component barrels; export named components/types explicitly.

---

## 1) Project layout & module boundaries

Source lives in `src/`:

- `src/modules/*` — feature modules (`api`, `components`, `hooks`, `store`, `validations`, local styles).
- `src/pages/*` — route-level screens.
- `src/shared/*` — reusable **UI components**, **hooks**, **utils**, **constants**, **interfaces**, **permissions**, common styles.
- `src/providers/*` — global providers (theme, router, auth, toaster, test providers).
- `src/configs/*` — axios base + React Query wrappers (**mandatory** for data fetching).
- `src/themes/*` — design tokens + theme CSS variables.
- `src/assets/*` — static assets.
- `public/*` — static deploy assets.
- `docs/*` — generated TypeDoc (do not edit).
- `dist/*` — build output.

### Inside a feature

```plaintext
src/modules/<Feature>/
  api/                 // API calls built on top of src/configs axios
  components/          // presentational/container components
  hooks/               // feature hooks (useXxx)
  store/               // local state (Zustand-style if needed)
  validations/         // zod/yup schemas for forms
  styles.ts            // local sx helpers
  <Feature>Module.tsx  // entry point for the feature
  index.ts             // public exports
```

---

## 2) Toolchain contracts (keep these in mind)

- **TypeScript** (`tsconfig.json`):
  - `"baseUrl": "."` and `"paths": { "@/*": ["src/*"] }` — always import via `@/...`.
  - Strict mode on; avoid `any`, use **precise generics** and discriminated unions.
  - `"moduleResolution": "bundler"`, `"isolatedModules": true` — keep files self-contained.
- **Vite** (`vite.config.ts`):
  - Plugins: `@vitejs/plugin-react-swc`, `vite-plugin-svgr`, `rollup-plugin-visualizer`.
  - **Alias** set for `@` → `./src`.
  - Respect existing `manualChunks` buckets and names; don’t change `manualChunks` logic.
- **ESLint** (flat, type-aware):
  - Parser uses project `tsconfig.json` (`parserOptions.project`), rules include React Hooks and TanStack Query recommended.
  - Stylistic concerns are handled by **Prettier**; formatting conflicts should be avoided.
- **Prettier**:
  - Use repo settings (print width **80**, semicolons, double quotes, trailing commas). Don’t override in code.

---

## 3) Networking & data flow (mandatory)

Use **only** `src/configs/*`:

- Axios base adds auth headers and `X-Locale` automatically.
- `useAxiosQuery` / `useAxiosSuspenseQuery` / `useAxiosMutation` are the only allowed primitives for data fetching/mutations.
- Normalize errors to `src/shared/interfaces/ApiErrorResponse` / `RequestResponseError`.
- Render errors via `shared_components/AxiosErrorAlertMessage` or `shared_utils/showApiError`.
- Render loading via `shared_components/AxiosLoadingCircularProgress`.

**Forbidden:**

- Raw `axios` imports or raw `useQuery` / `useMutation` from TanStack.
- Ad-hoc error objects or swallowing HTTP codes.

Pagination & tables:

- Use `shared_interfaces_Basic.TablePagination` + `shared_hooks_useTablePagination`.
- Column config belongs to `hooks/` (e.g., `use<Feature>TableColumns.ts`) and should be memoized.

---

## 4) Forms & validation

- Reuse schemas from `modules/*/validations` when possible; otherwise create a new local schema.
- Prefer shared inputs/selects: `shared/components/*`, options from `shared/constants/*` (countries, roles, listing types).
- Submit via `use<Verb><Thing>Mutation` hooks; on failure rely on shared error UX.

---

## 5) State, permissions, i18n

- Local state lives in `modules/<Feature>/store` (Zustand-style when needed).
- Permissions: `src/shared/permissions/*` (hooks like `useIsAdmin`, `useIsAgentManager`, guard `RequirePermission`). **Do not** hard-code role checks.
- i18n: headers (`X-Locale`) are auto-injected by axios config; don’t hardcode locale-specific strings where server messages exist.

---

## 6) Security & content

- Avoid `dangerouslySetInnerHTML`. If you must render HTML, use existing sanitizers (`htmlToText`, `sanitizeUrl`, `isAllowedUri` in TipTap utils).
- Validate external links/protocols.
- Photo/file flows must respect access flags (`is_main`, access types) and existing APIs.

---

## 7) Performance

- Memoize heavy components (`React.memo`, `useMemo`, `useCallback`).
- Prefer code-splitting (`React.lazy`) for large modules; keep Vite chunk naming stable.
- Use sane `staleTime`/`cacheTime` on queries; don’t duplicate cache keys.

---

## 8) Testing

- **Vitest + Testing Library**; environment: `jsdom`.
- Co-locate specs (`*.spec.ts(x)` / `*.test.ts(x)`).
- Mock HTTP with `axios-mock-adapter`.
- For provider-heavy tests, wrap with `src/providers/TestProviders.tsx`.
- Ensure **pure utils** in `shared/utils` and non-trivial hook logic have coverage.

---

## 9) Scripts & quality gates

- Dev: `pnpm dev` (port **7777**, opens browser).
- Build: `pnpm build` (TypeScript `tsc` + Vite, source maps on), staging: `pnpm build-stage`.
- Lint/format/test: `pnpm lint`, `pnpm format:check`, `pnpm test`.
- Docs: `pnpm gen-docs` (TypeDoc with `typedoc-plugin-missing-exports`).
- Release: `pnpm release` (release-it; runs `pnpm precommit` before tag).

**PR gate:** `pnpm precommit` (runs format → lint → test → gen-docs) must pass before merge.

---

## 10) Prompt template for Codex (copy → edit → run)

> **Task:** Implement `<Feature>` at `src/modules/<Feature>/…` using React 19 + TS + Tailwind CSS + shadcn/ui.  
> **Use only:** `src/configs/*` (`useAxiosQuery/Mutation/SuspenseQuery`) and axios base; **reuse** `src/shared/*`.  
> **Deliver:** full code (no placeholders), strict TS; **Typedoc** for each hook/utility; error UX via shared components; respect permissions; import via `@/*`.  
> **Don’t:** add deps, call raw axios/react-query, duplicate utils, change Vite chunk names.

**Inputs to provide:**

- API endpoints + minimal shapes,
- Which shared types/interfaces to reuse,
- UI/validation requirements,
- Permission constraints (if any).

---

## 11) New feature checklist

1. Create feature folder + `index.ts` re-exports.
2. Types/interfaces — reuse from `src/shared/interfaces/*` where possible.
3. API — only via `src/configs/*` wrappers; consistent error shape.
4. Components — prefer `src/shared/components/*` first.
5. Lists/tables — `shared_hooks_useTablePagination` + memoized column config.
6. Permissions — `src/shared/permissions/*` (no hardcoded role logic).
7. Tests — pure utils + significant hook logic.
8. **Typedoc** on hooks/utils.
9. `pnpm precommit` locally before PR.
