import { Link } from "react-router-dom";

export const AccessDenied = () => {
  return (
    <section className="section" data-testid="pageAccessDenied">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
        <div className="space-y-4">
          <h1 className="text-h4 text-foreground">Доступ запрещен (401)</h1>
          <div className="space-y-2">
            <h2 className="text-h5 text-foreground">Что случилось?</h2>
            <p className="text-body1 text-labels-secondary">
              Вы попали на страницу, для просмотра которой у Вас нет прав
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-h5 text-foreground">Почему это произошло?</h2>
            <p className="text-body1 text-labels-secondary">
              В большинстве ситуаций ошибка 401 отображается, если вы открыли
              страницу, к которой у Вас нет прав
            </p>
          </div>
          <Link to="/" className="text-body1 text-primary underline">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </section>
  );
};
