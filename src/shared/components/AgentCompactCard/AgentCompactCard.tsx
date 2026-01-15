import { MdStar } from "react-icons/md";

import { UserSlim } from "@/shared/interfaces";

interface AgentCompactCardProps {
  agent: UserSlim;
}

export const AgentCompactCard = ({ agent }: AgentCompactCardProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground md:h-16 md:w-16">
        <span className="text-h4">{agent.first_name[0]}</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-subtitle2 text-foreground">
          {agent.last_name} {agent.first_name}
        </p>
        <p className="text-caption1 text-labels-secondary">
          Специалист по недвижимости
        </p>
        <div className="flex items-center gap-1 text-caption1 text-labels-secondary">
          <span>
            Рейтинг <strong>5.0</strong>
          </span>
          <MdStar color="#FACC15" />
        </div>
      </div>
    </div>
  );
};
