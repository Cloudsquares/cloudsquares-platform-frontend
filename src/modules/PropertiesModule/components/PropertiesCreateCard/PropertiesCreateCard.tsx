import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface PropertiesCreateCardProps {
  title: string;
  description: string;
}

export const PropertiesCreateCard = ({
  title,
  description,
}: PropertiesCreateCardProps) => {
  return (
    <Card>
      <CardContent className="space-y-2">
        <h6 className="text-h6 text-foreground">{title}</h6>
        <p className="text-body1 text-labels-secondary">{description}</p>
        <Button asChild size="lg" className="w-full">
          <Link to="/properties/create">Добавить объект</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
