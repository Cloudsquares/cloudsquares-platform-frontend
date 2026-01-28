# TASK_PROMPTS (RU).md

Подборка шаблонов для Codex/AI, чтобы генерировать фронтенд-код **CloudSquares** строго по нашей архитектуре и конфигам.
Ориентировано на React 19 + TypeScript + Vite 7 + shadcn/ui + Tailwind, ESLint (flat), Prettier, Vitest, TypeDoc.

---

## Как пользоваться

1. Выбери подходящий шаблон.
2. Замени плейсхолдеры `<Feature>`, `<API_PATH>`, `<ThingId>`, `<Props>`.
3. Держи задачи **небольшими и точечными** (один хук/компонент за запуск).
4. Если задача связана с сетевыми вызовами — **всегда** используй врапперы из `@/configs/*`.

> **Важно:** никогда не вставляй секреты (API-ключи, значения из `.env*`). Репо уже игнорирует `.env*` — так и оставляем.

---

## Глобальные ограничения (для всех промптов)

- **Импорты:** только через алиас `@/*` (настроен в `tsconfig.json` / `vite.config.ts`). Без глубоких относительных путей.
- **Ре-экспорты:** не использовать `export *` в barrel-файлах компонентов; экспортировать явные компоненты/типы.
- **Props-типы:** если типы ре-экспортируются из barrel, то компонент обязан их экспортировать (`export interface/type`).
- **TypeScript:** строгий, **без `any`**, учитывай `noUncheckedSideEffectImports`, `isolatedModules`, `moduleResolution: "bundler"`.
- **HTTP / React Query:** только через `@/configs/*` (`useAxiosQuery`, `useAxiosSuspenseQuery`, `useAxiosMutation`) и наш настроенный axios.
- **Ошибки/Загрузка:** тип `@/shared/interfaces/ApiErrorResponse`; UI через `shared_components/AxiosErrorAlertMessage` / `shared_components/AxiosLoadingCircularProgress` / `shared_utils/showApiError`.
- **Переиспользование:** в приоритете `@/shared/*` (components/hooks/utils/constants/permissions/interfaces).
- **Права доступа:** только `@/shared/permissions/*` (хуки + `RequirePermission`). Никакой «ручной» логики ролей в компонентах.
- **i18n:** заголовок `X-Locale` проставляется axios автоматически; не хардкодим.
- **Форматирование:** Prettier (printWidth **80**, точки с запятой, двойные кавычки). Не переопределять в файлах.
- **Vite:** не ломаем имена чанков в `manualChunks` (vendor-react, vendor-maps, vendor-zustand, vendor-react-query, vendor-hookform, vendor-axios, vendor-date, vendor-icons).
- **Документация:** добавляй **Typedoc**-блоки для каждого утилити/хука; `pnpm gen-docs` обновляет `docs/`.
- **Тесты:** для чистых утилит и нетривиальной логики хуков (Vitest + Testing Library).

---

## 1) Общий шаблон задачи

```
Задача: Реализовать <Feature> по пути <path> на React 19 + TypeScript + shadcn/ui + Tailwind.

Ограничения:
- Строгий TS (без `any`), импорты через `@/*`, без глубоких относительных путей.
- Использовать ТОЛЬКО врапперы из `@/configs/*` (`useAxiosQuery`, `useAxiosSuspenseQuery`, `useAxiosMutation`) и настроенный axios.
- Переиспользовать `@/shared/*` (components/hooks/utils/constants/interfaces/permissions).
- Ошибки через ApiErrorResponse; показывать общими компонентами; не придумывать тексты, если сервер возвращает сообщения.
- Права — `RequirePermission` и хуки `useUserAccess*`.
- Новые зависимости — только при реальной необходимости.

Входные данные:
- API-спека (только нужное): пути, методы, параметры, форматы ответа.
- Существующие типы для переиспользования (`@/shared/interfaces/*`).
- UI/валидация и навигация/эффекты (успех/ошибка).

Результат:
- Полный рабочий код (без заглушек), **Typedoc** у утилит/хуков.
- `index.ts`-реэкспорты при необходимости.
- Тесты для чистых утилит/селекторов.
- Сборка/линт/тесты проходят через `pnpm precommit`.
```

---

## 2) Хук запроса (GET)

```
Задача: Создать `useGet<Thing>Query` в `src/modules/<Feature>/hooks/useGet<Thing>Query.ts`.

Ограничения:
- `useAxiosQuery` из `@/configs`, стабильный `queryKey` (например, ["<things>", <params>]).
- Строгие типы из `@/shared/interfaces/*`, если есть.
- Возвращать `{ data, isLoading, error }` с корректными дженериками.
- Добавить **Typedoc** (параметры/возврат + пример).

Входные данные:
- Endpoint: GET `<API_PATH>` (params: <params>). Response: `<ResponseShape>`.
- Кеширование: желаемые `staleTime`/`enabled` (если нужно).

Результат:
- Файл с хуком, строгие типы; селекторы для списков — по необходимости (мемоизированы).
```

---

## 3) Хук мутации (POST/PATCH/DELETE)

```
Задача: Создать `use<Verb><Thing>Mutation` в `src/modules/<Feature>/hooks/use<Verb><Thing>Mutation.ts`.

Ограничения:
- `useAxiosMutation` из `@/configs`.
- Строго типизировать payload/response, ошибка — `ApiErrorResponse`.
- При ошибке вызвать `showApiError(error)`; коды HTTP не переписывать и не скрывать.
- Экспортировать `mutate`, `mutateAsync` и флаги статуса.

Входные данные:
- Endpoint: <METHOD> `<API_PATH>`. Request: `<PayloadType>`. Response: `<ResponseType>`.

Результат:
- Строго типизированный хук, **Typedoc**, короткий пример использования в комментарии.
```

---

## 4) Фасад API-модуля (необязательно, но желательно)

```
Задача: Добавить фасад `src/modules/<Feature>/api/api<Feature>Module.ts`.

Ограничения:
- Экспортировать минимальные функции, которые внутри используют наш axios-основанный слой или вызовы хуков.
- **Нельзя** импортировать «сырой» axios вне `@/configs`.

Результат:
- `api<Feature>Module.ts` + `index.ts` с реэкспортами.
```

---

## 5) Страница списка с пагинацией

```
Задача: Реализовать `<Feature>List` в `src/modules/<Feature>/components/<Feature>List.tsx`
и роут-страницу `src/pages/<FeaturePlural>/<FeaturePlural>.tsx`.

Ограничения:
- Получать данные через созданный хук запроса.
- Использовать `shared_hooks_useTablePagination` + `shared_interfaces_Basic.TablePagination`.
- Переиспользовать общие ячейки/компоненты; иначе — маленькие типизированные ячейки.
- Loading: `AxiosLoadingCircularProgress`. Errors: `AxiosErrorAlertMessage`.
- Мемоизировать рендереры колонок; без тяжёлых inline-callbacks.

Результат:
- Компонент списка + страница. Конфиг колонок вынести в `hooks/use<Feature>TableColumns.ts`.
```

---

## 6) Форма (создание/обновление)

```
Задача: Реализовать `<Feature>Form` в `src/modules/<Feature>/components/<Feature>Form.tsx` (+ дровер/страницу при необходимости).

Ограничения:
- Переиспользовать схему в `modules/<Feature>/validations/`, либо создать отдельный файл схемы.
- Отправка через `use<Verb><Thing>Mutation` из `@/configs`.
- Поля ввода: `shared_components_BasicTextField`, `BasicFormSelectField`, опции из `shared_constants_BasicSelectOptions/*`.
- Успех: колбэк или навигация. Ошибка: общий рендер ошибок, без самодельных текстов.

Результат:
- Строго типизированные пропсы, **Typedoc**, минимальный тест для любой новой утилиты нормализации.
```

---

## 7) Блок деталей/информации

```
Задача: Реализовать `<Feature>Details` в `src/modules/<Feature>/components/<Feature>Details.tsx`.

Ограничения:
- Читать через `useGet<Thing>Query` (обычный или suspense-вариант).
- Переиспользовать хелперы: `propertyTitle`, `propertyAddress`, `formatDateTime`, и т.д.
- Компонент — презентационный; мемоизировать там, где это даёт эффект.

Результат:
- Типизированный презентационный компонент.
```

---

## 8) Секция под пермишены

```
Задача: Оградить секцию в `<Feature>Module.tsx` с помощью `RequirePermission` из `@/shared/permissions/guards`.

Ограничения:
- Использовать хуки `useUserAccess` (`useIsAdmin`, `useIsAgentManager`, и т.п.).
- Не хардкодить проверку ролей в JSX.
```

---

## 9) TipTap — расширение/панель (когда применимо)

```
Задача: Расширить возможности TipTap в `src/modules/TipTapEditorModule/...`.

Ограничения:
- Переиспользовать уже написанные примитивы/компоненты в модуле TipTap.
- Валидация ссылок через `isAllowedUri` / `sanitizeUrl` до вставки.
- Избегать `dangerouslySetInnerHTML`; все входные данные — через санитайзеры.

Результат:
- Расширение/элемент тулбара с строгой типизацией и **Typedoc**.
```

---

## 10) Перфоманс-правила (вставляй в PR)

- Минимизировать перерисовки: `React.memo`, `useMemo`, `useCallback` для тяжёлых ячеек/списков.
- Крупные фичи — через `React.lazy`; сохранять стабильные имена чанков Vite.
- Задавать разумные `staleTime`/`cacheTime`; не дублировать кэш-ключи; переиспользовать селекторы.

---

## 11) Чек-лист безопасности (вставляй в PR)

- Без `dangerouslySetInnerHTML`, если это не крайняя мера; в таком случае — санитайз и комментарий.
- Валидировать внешние ссылки/URL изображений; использовать общие хелперы URL/HTML→text.
- Никаких секретов в коде/комментариях/тестах. Не импортировать `.env*` на клиенте.
- Потоки файлов/фото — уважать флаги доступа и ограничения сервера.

---

## 12) Review Checklist (копипаст в PR)

- [ ] Используются только `@/configs`-врапперы (никакого сырого axios/react-query).
- [ ] Переиспользованы `@/shared/*` компоненты/хуки/утилиты/константы/интерфейсы.
- [ ] Строгий TS (без `any`), импорты через `@/*`.
- [ ] Корректный UX ошибок/загрузки (`ApiErrorResponse`, общие компоненты).
- [ ] Пагинация через общие хуки (если применимо).
- [ ] Пермишены через общие хуки/гарды (если применимо).
- [ ] **Typedoc** добавлен к хукам/утилитам.
- [ ] Тесты для чистых утилит/селекторов (если появились).
- [ ] Нет лишних перерисовок; рендереры колонок мемоизированы.
- [ ] `pnpm precommit` проходит (format → lint → test → docs).

## 13) Быстрые промты

Вариант 1 - Быстрый, без паузы на подтверждение

```plaintext
Задача (CloudSquares): <опиши, что нужно сделать человеческим языком>.

Инструкции агенту:

1. Открой ROOT/TASK_PROMPTS.md (RU/EN) и сам выбери подходящий шаблон.
2. Соблюдай ROOT/AGENTS.md (архитектура, @/configs, @/shared, пермишены, Typedoc, строгий TS, без новых deps).
3. В начале ответа напиши:
   - TEMPLATE: <название выбранного шаблона из TASK_PROMPTS.md>
   - FILES: <список файлов, которые создаёшь/меняешь с путями>
4. Затем сразу выдай полный код (без заглушек) по выбранному шаблону.
5. В конце выведи блоки:
   - CHANGES: дерево изменённых/новых файлов
   - NOTES: как обработал ошибки/пермишены/кеширование
   - NEXT: короткий список возможных следующих шагов
```

Вариант 2 - безопасный, с мини-планом и подтверждением

```plaintext
Задача (CloudSquares): <опиши задачу простым языком>.

Инструкции агенту:
1) Открой ROOT/TASK_PROMPTS.md и выбери шаблон.
2) Покажи PLAN (не код):
   - TEMPLATE: <шаблон>
   - PATHS: файлы/папки, которые создашь/изменишь
   - API: какие эндпоинты и типы будешь использовать
   - ACCEPTANCE: критерии готовности (согласно AGENTS.md)
3) Если PLAN ок — продолжай автоматически и выдай полный код. Если что-то критично расходится — задай 1 вопрос, затем продолжай.
4) Обязательные правила: следуй ROOT/AGENTS.md; все сети через `@/configs/*`; максимальное переиспользование `@/shared/*`; строгий TS; Typedoc на хуки/утилиты; без «сырого» axios/useQuery.
5) В конце выведи CHANGES/NOTES/NEXT.

```

Промт для тестов

```plaintext
Задача (только тесты): Напиши unit/interaction-тесты для компонента
`src/modules/<Feature>/components/<Component>.tsx` (React 19, Vitest + Testing Library).

Открой ROOT/TASK_PROMPTS.md и выбери шаблон «Тесты для компонента»/«List Page…» по ситуации.
Ограничения:
- Создавай ТОЛЬКО файлы `__tests__/*.test.tsx` рядом с компонентом. Исходный код/конфиги не менять.
- Моки сети через axios-mock-adapter и моки наших `@/configs`-хуков.
- Использовать role-based селекторы (getByRole/getByLabelText). Без “хрупких” getByText.
- Учитывать наши shared-компоненты и пермишены, если они влияют на рендер.
```

## 14) Шаблон — Тесты для компонента (Vitest + Testing Library)

```plaintext
Задача (только тесты): Написать unit/interaction-тесты для компонента
`src/modules/<Feature>/components/<Component>.tsx` (React 19, Vitest + @testing-library/react).

Ограничения:
- Создавать ТОЛЬКО файлы `*.test.tsx` рядом с компонентом. Исходный код/конфиги не изменять.
- Оборачивать рендер в `src/providers/TestProviders.tsx` (если компонент зависит от Router, QueryClient, Theme и т.п.).
- Сетевые вызовы/хуки замещать через моки:
  - Использовать `axios-mock-adapter` на нашем axios-инстансе из `@/configs/api/axiosConfig`.
  - Либо замокать врапперы (`@/configs/useAxiosQuery|useAxiosMutation`) через `vi.mock(...)`.
- Селекторы — только по ролям и доступности: `getByRole`, `getByLabelText`, `getByPlaceholderText`.
  Избегать хрупких `getByText("Сохранить")`, если есть `name`/`aria-label`.
- Учитывать пермишены: если рендер зависит от ролей, подставить соответствующий начальный state провайдера/стора.

Входные данные (заполнить):
- Пропсы компонента (минимальный и полный набор).
- Сценарии сети: успешный ответ, ошибка (HTTP-код + тело `ApiErrorResponse`).
- Критичные UX-кейсы: загрузка, пустые данные, валидация/disabled, клики/submit.

Результат:
- Полный файл `<Component>.test.tsx` с кейсами:
  1) Рендер без ошибок.
  2) Отображение состояния загрузки (`AxiosLoadingCircularProgress`), затем данных.
  3) Ошибки — через общий компонент/тост (`AxiosErrorAlertMessage`/`showApiError`).
  4) Пользовательские события (клики, ввод, submit) через `user-event`.
  5) Ветвления по пермишенам (если применимо).

Формат ответа:
- TEMPLATE: "Тесты для компонента (Vitest + Testing Library)"
- FILES: список созданных тестовых файлов с путями
- Далее — полный код тестов (без заглушек)
- В конце — CHANGES/NOTES/NEXT
```

## 15) Шаблон — Тесты для утилиты (pure functions)

Задача (только тесты): Написать unit-тесты для утилиты
`src/<path>/utils/<util>.ts` (Vitest).

Ограничения:

- Создавать файл `__tests__/<util>.test.ts` рядом с утилитой.
- Никаких сторонних эффектов: тестировать чистую логику, граничные значения, NaN/undefined/пустые строки.
- Если утилита форматирует цены/даты — сверять с ожидаемыми строками для нескольких локалей/валют (при необходимости).

Результат:

- Полный тест с наборами кейсов: обычные входы, крайние случаи, некорректные входы.
- Без моков React/DOM.
