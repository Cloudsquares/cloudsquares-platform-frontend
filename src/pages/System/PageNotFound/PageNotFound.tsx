import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section className="section" data-testid="pagePageNotFound">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-h4 text-foreground">Страница не найдена (404)</h2>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground">Что случилось?</h3>
              <p className="text-body1 text-labels-secondary">
                Вы попали на страницу, которой не существует
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground">Почему это произошло?</h3>
              <p className="text-body1 text-labels-secondary">
                В большинстве ситуаций ошибка 404 отображается, если связь с
                сервером установлена, но информации по заданному запросу нет.
                Возможно, в адресе опечатка — такое случается при ручном наборе.
                Или страница была удалена, но сохранилась в закладках вашего
                браузера
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-h5 text-foreground">Что делать?</h3>
              <p className="text-body1 text-labels-secondary">
                Поскольку мы не знаем, как и откуда вы попали на эту страницу, то
                рекомендуем вернуться на{" "}
                <Link to="/" className="text-primary underline">
                  главную страницу
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
