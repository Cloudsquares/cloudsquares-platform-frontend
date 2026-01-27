import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

export const NotAuthInfoBlock = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4">
      <div className="w-full py-4">
        <Card>
          <CardContent className="space-y-2">
            <h6 className="text-h6 text-foreground">
              Упс, Вы не авторизованы ;(
            </h6>
            <p className="text-body1 text-labels-secondary">
              Управляйте объектами недвижимости и заявками!
            </p>
            <p className="text-body1 text-labels-secondary">
              Для этого необходимо войти в систему или создать аккаунт :)
            </p>
            <Button asChild className="w-full">
              <Link to="/login">{t("login")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
