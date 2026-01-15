import React from "react";
import { Grid } from "@mui/material";
import { useGetAllUsersQuery } from "../../hooks";
import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { getUserStatusPriority } from "@/shared/utils";
import { UsersListItem } from "../UsersListItem";
import { UsersListSkeleton } from "../UsersListSkeleton";

export const UsersList = () => {
  const { data, isSuccess, isLoading, error } = useGetAllUsersQuery();

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
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

  }, [data]);

  return (
    <React.Fragment>
      {isLoading && <UsersListSkeleton />}
      {error && <AxiosErrorAlertMessage error={error} />}
      {isSuccess &&
        sortedUsers.map((user) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={user.id}>
            <UsersListItem user={user} />
          </Grid>
        ))}
    </React.Fragment>
  );
};
