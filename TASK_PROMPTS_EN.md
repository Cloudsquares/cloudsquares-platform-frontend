# TASK_PROMPTS.md

Curated prompts for Codex/AI to generate **CloudSquares** frontend code that follows our architecture and configs.
Covers React 19 + TypeScript + Vite 7 + MUI 7, ESLint (flat), Prettier, Vitest, TypeDoc.

---

## How to use

1. Pick the closest template.
2. Replace placeholders like `<Feature>`, `<API_PATH>`, `<ThingId>`, `<Props>`.
3. Keep tasks **small & focused** (one hook/component per run).
4. Paste prompt into Codex. If the task touches data fetching, **always** use `src/configs/*` wrappers.

> **Important:** Never paste secrets (API keys, .env values). The repo ignores `.env*`; keep it that way.

---

## Global constraints (applies to all prompts)

- **Imports:** use the `@/*` alias (configured in `tsconfig.json` / `vite.config.ts`). No deep relative imports.
- **Re-exports:** avoid `export *` in component barrels; export explicit components/types.
- **TypeScript:** strict, **no `any`**, honor `noUncheckedSideEffectImports`, `isolatedModules`, `moduleResolution: "bundler"`.
- **HTTP/React Query:** only via `src/configs/*` (`useAxiosQuery`, `useAxiosSuspenseQuery`, `useAxiosMutation`) and our axios instance.
- **Errors/Loading:** use `src/shared/interfaces/ApiErrorResponse` and `shared_components/AxiosErrorAlertMessage` / `shared_components/AxiosLoadingCircularProgress` / `shared_utils/showApiError`.
- **Reuse first:** prefer `src/shared/*` components/hooks/utils/constants/permissions/interfaces.
- **Permissions:** gate via `src/shared/permissions/*` (hooks + `RequirePermission`). No inline role logic.
- **i18n:** axios injects `X-Locale`; never hardcode it.
- **Formatting:** Prettier (printWidth **80**, semicolons, double quotes). Don’t override in files.
- **Vite:** do not change `manualChunks` naming (vendor-react, vendor-maps, vendor-mui, vendor-zustand, vendor-react-query, vendor-hookform, vendor-axios, vendor-date, vendor-icons).
- **Docs:** add **Typedoc** blocks for every utility/hook; `pnpm gen-docs` updates `docs/`.
- **Tests:** for pure utilities and non-trivial hook logic (Vitest + Testing Library).

---

## 1) General Task Template

```
Task: Implement <Feature> at <path> using React 19 + TypeScript + Vite + MUI.

Constraints:
- Strict TS (no `any`), import via `@/*`, no deep relatives.
- Use ONLY `src/configs/*` wrappers (`useAxiosQuery`, `useAxiosSuspenseQuery`, `useAxiosMutation`) and configured axios.
- Reuse `src/shared/*` components/hooks/utils/constants/interfaces/permissions.
- Errors via ApiErrorResponse; show with shared components; do not craft ad‑hoc strings if server provides messages.
- Respect permissions with `RequirePermission` and `useUserAccess*` hooks.
- No new deps unless strictly necessary.

Inputs:
- API spec (only what’s needed): paths, methods, params, response shape.
- Shared types to reuse (from `src/shared/interfaces/*`).
- UI/validation rules and navigation/side effects (success/error).

Deliverables:
- Complete code (no placeholders), **Typedoc** on utilities/hooks.
- `index.ts` re‑exports where appropriate.
- Tests for any pure utilities/selectors.
- Build/lint/test must pass with `pnpm precommit`.
```

---

## 2) Query Hook (GET)

```
Task: Create `useGet<Thing>Query` at `src/modules/<Feature>/hooks/useGet<Thing>Query.ts`.

Constraints:
- Use `useAxiosQuery` from `@/configs`, stable `queryKey` (e.g., ["<things>", <params>]).
- Strong types from `@/shared/interfaces/*` when available.
- Return `{ data, isLoading, error }` with proper generics.
- Add **Typedoc** (params/returns + example).

Inputs:
- Endpoint: GET `<API_PATH>` (params: <params>). Response: `<ResponseShape>`.
- Caching: desired `staleTime`/`enabled` rules (if any).

Deliverables:
- Hook file with strict TS; memoized selectors if heavy lists.
```

---

## 3) Mutation Hook (POST/PATCH/DELETE)

```
Task: Create `use<Verb><Thing>Mutation` at `src/modules/<Feature>/hooks/use<Verb><Thing>Mutation.ts`.

Constraints:
- Use `useAxiosMutation` from `@/configs`.
- Strongly-typed payload & response, error typed as `ApiErrorResponse`.
- On error call `showApiError(error)`; do NOT swallow/rewrite HTTP codes.
- Expose `mutate`, `mutateAsync`, and status flags.

Inputs:
- Endpoint: <METHOD> `<API_PATH>`. Request: `<PayloadType>`. Response: `<ResponseType>`.

Deliverables:
- Hook with strict TS, **Typedoc**, short example usage in the comment.
```

---

## 4) API Module Facade (optional but recommended)

```
Task: Add API facade at `src/modules/<Feature>/api/api<Feature>Module.ts`.

Constraints:
- Export minimal functions that internally use our axios base or call the above hooks.
- Keep function names stable and typed; **do not** import raw axios directly outside `@/configs`.

Deliverables:
- `api<Feature>Module.ts` + `index.ts` re-exports.
```

---

## 5) List Page with Pagination

```
Task: Implement `<Feature>List` component at `src/modules/<Feature>/components/<Feature>List.tsx`
and a route page at `src/pages/<FeaturePlural>/<FeaturePlural>.tsx`.

Constraints:
- Fetch via your query hook.
- Use `shared_hooks_useTablePagination` + `shared_interfaces_Basic.TablePagination`.
- Reuse shared table cells/components; otherwise create small typed cells.
- Loading: `AxiosLoadingCircularProgress`. Errors: `AxiosErrorAlertMessage`.
- Memoize column renderers; avoid inline heavy callbacks.

Deliverables:
- List + page. Extract column config to `hooks/use<Feature>TableColumns.ts`.
```

---

## 6) Form (Create/Update)

```
Task: Implement `<Feature>Form` at `src/modules/<Feature>/components/<Feature>Form.tsx` (+ drawer/page wrapper if needed).

Constraints:
- Reuse existing validation schema from `modules/<Feature>/validations/` or create a separate schema file.
- Submit via `use<Verb><Thing>Mutation` from `@/configs`.
- Inputs: use `shared_components_BasicTextField`, `BasicFormSelectField`, options from `shared_constants_BasicSelectOptions/*`.
- Success: callback prop or navigation. Failure: rely on shared error rendering.

Deliverables:
- Strictly typed props, **Typedoc**, minimal unit test for any normalization utility.
```

---

## 7) Details/Info Block

```
Task: Build `<Feature>Details` at `src/modules/<Feature>/components/<Feature>Details.tsx`.

Constraints:
- Read via `useGet<Thing>Query` (regular or suspense variant).
- Use shared info helpers: `propertyTitle`, `propertyAddress`, `formatDateTime`, etc.
- Keep presentational, memoize where helpful.

Deliverables:
- Typed presentational component.
```

---

## 8) Permission-Guarded Area

```
Task: Gate a section in `<Feature>Module.tsx` using `RequirePermission` from `@/shared/permissions/guards`.

Constraints:
- Use `useUserAccess` hooks (`useIsAdmin`, `useIsAgentManager`, etc.).
- No hardcoded role logic in components.
```

---

## 9) TipTap Editor Extension/Toolbar (when relevant)

```
Task: Extend TipTap features in `src/modules/TipTapEditorModule/...`.

Constraints:
- Prefer existing primitives/components under TipTap module.
- Validate links with `isAllowedUri` / `sanitizeUrl` helpers before insertion.
- Do not use `dangerouslySetInnerHTML` directly; sanitize inputs.

Deliverables:
- Extension/toolbar piece with strict TS and **Typedoc**.
```

---

## 10) Performance guardrails (copy into PR)

- Avoid re-renders: `React.memo`, `useMemo`, `useCallback` around heavy cells/lists.
- Code-split large feature modules with `React.lazy`; keep Vite chunk names stable.
- Use reasonable `staleTime`/`cacheTime` in queries; reuse query keys; avoid duplicate caches.

---

## 11) Security checklist (copy into PR)

- No `dangerouslySetInnerHTML` unless absolutely required; sanitize and document.
- Validate external links and image URLs; use shared helpers for URLs and HTML→text.
- No secret leakage in code, comments, or tests. Do not import `.env*` in client code.
- File/photo flows must honor access flags and server constraints.

---

## 12) Review Checklist (paste in PR)

- [ ] Uses `@/configs` wrappers only (no raw axios/react-query).
- [ ] Reuses `@/shared/*` components/hooks/utils/constants/interfaces.
- [ ] Strict TS (no `any`), import via `@/*`.
- [ ] Proper error/loading UX (`ApiErrorResponse`, shared components).
- [ ] Pagination via shared hooks (if applicable).
- [ ] Permissions via shared hooks/guards (if applicable).
- [ ] **Typedoc** added to hooks/utilities.
- [ ] Tests for pure utilities/selectors (if created).
- [ ] No unnecessary re-renders; column renderers memoized.
- [ ] `pnpm precommit` passes (format → lint → test → docs).
