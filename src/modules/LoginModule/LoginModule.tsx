import { LoginForm } from "./components/LoginForm";
import { useLogoutEffect } from "./hooks";
import { RegistrationModule } from "../RegistrationModule";

/**
 * Модуль страницы входа в систему.
 *
 * - Центрирует форму входа (`LoginForm`) по горизонтали и вертикали.
 * - Использует `useLogoutEffect` для выхода из учетной записи.
 *
 * @returns React-компонент модуля входа
 */
export const LoginModule = () => {
  useLogoutEffect();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full">
        <LoginForm />
        <RegistrationModule />
      </div>
    </div>
  );
};
