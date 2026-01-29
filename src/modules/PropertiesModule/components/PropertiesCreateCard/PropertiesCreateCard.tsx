import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { Button, Card, CardContent } from "@/shared/components/ui";

interface PropertiesCreateCardProps {
  title: string;
  description: string;
}

export const PropertiesCreateCard = ({
  title,
  description,
}: PropertiesCreateCardProps) => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground">
          <Plus className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h6 className="text-h6 text-foreground">{title}</h6>
          <p className="text-body2 text-muted-foreground">{description}</p>
        </div>
        <Button asChild size="lg" className="w-full">
          <Link to="/properties/create">Добавить объект</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
