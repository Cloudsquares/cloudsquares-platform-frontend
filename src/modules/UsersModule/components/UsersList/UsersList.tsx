import React from "react";

import { useGetAllUsersQuery } from "@/modules/UsersModule/hooks";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { Alert, AlertDescription } from "@/shared/components/ui";
import { useSearchQueryParam } from "@/shared/hooks";
import { getUserStatusPriority } from "@/shared/utils";
import { UsersListItem } from "@/modules/UsersModule/components/UsersListItem";
import { UsersListSkeleton } from "@/modules/UsersModule/components/UsersListSkeleton";

export const UsersList = () => {
  const { query } = useSearchQueryParam();
  const { data, isSuccess, isLoading, error } = useGetAllUsersQuery(
    query || undefined,
  );

  const sortedUsers = React.useMemo(() => {
    if (!data) return [];

    return [...data].sort((a, b) => {
      // Сначала по приоритету статуса
      const statusPriority =
        getUserStatusPriority(a.user_status.status) -
        getUserStatusPriority(b.user_status.status);

      if (statusPriority !== 0) {
        return statusPriority;
      }

      // Затем по дате создания (старые — выше)
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }, [data]);

  const hasSearchQuery = query.trim().length > 0;

  return (
    <React.Fragment>
      {isLoading && <UsersListSkeleton />}
      {error && <AxiosErrorAlertMessage error={error} />}
      {isSuccess && sortedUsers.length === 0 && hasSearchQuery && (
        <Alert variant="info">
          <AlertDescription>
            По заданному поиску ничего не найдено.
          </AlertDescription>
        </Alert>
      )}
      {isSuccess && sortedUsers.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedUsers.map((user) => (
            <UsersListItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};
