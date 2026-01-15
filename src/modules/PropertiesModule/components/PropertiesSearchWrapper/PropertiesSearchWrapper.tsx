import toast from "react-hot-toast";

import { SearchInputForm } from "../../../../shared/components/SearchInputForm";

export const PropertiesSearchWrapper = () => {
  const sendRequest = () => {
    toast.error("Поиск в разработке");
  };
  return (
    <div className="w-full">
      <SearchInputForm sendRequest={sendRequest} />
    </div>
  );
};
