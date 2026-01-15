export const AxiosLoadingCircularProgress = () => {
  return (
    <div
      className="flex items-center justify-center p-4"
      data-testid="componentAxiosLoadingCircularProgress"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
    </div>
  );
};
