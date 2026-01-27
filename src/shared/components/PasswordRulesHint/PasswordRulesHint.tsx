/**
 * Список правил для пароля с проверкой соответствия
 */
interface PasswordRulesHintProps {
  password: string;
  touched: boolean;
}

export const PasswordRulesHint = ({
  password,
  touched,
}: PasswordRulesHintProps) => {
  const rules = [
    {
      label: "Минимум 12 символов",
      passed: password?.length >= 12,
    },
    {
      label: "Хотя бы одна заглавная буква (A-Z)",
      passed: /[A-Z]/.test(password),
    },
    {
      label: "Хотя бы одна строчная буква (a-z)",
      passed: /[a-z]/.test(password),
    },
    {
      label: "Хотя бы одна цифра (0-9)",
      passed: /\d/.test(password),
    },
    {
      label: "Хотя бы один спецсимвол (!*@#$%^&+=_-)",
      passed: /[!*@#$%^&+=_-]/.test(password),
    },
  ];

  const allPassed = rules.every((r) => r.passed);

  if (!touched || allPassed) return null;

  return (
    <div className="mt-2 space-y-1">
      {rules.map((rule, index) => (
        <p key={index} className={rule.passed ? "text-success" : "text-error"}>
          {rule.label}
        </p>
      ))}
    </div>
  );
};
