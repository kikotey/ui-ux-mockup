import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useSearch } from "@tanstack/react-router";
import { successRoute } from "../routing/routes";

export const Success = () => {
  const { t } = useTranslation();
  const search = useSearch({ from: successRoute.id });

  // Extract the value of the "from" parameter from the search
  const fromPage = search.from || "";

  // Define titles based on the source page
  const pageTitles = {
    createPassword: {
      title: t("success.changePwdTitle"),
      message: t("success.changePwdMessage"),
    },
    recovery: {
      title: t("success.recoveryTitle"),
      message: t("success.recoveryMessage"),
    },
  };

  const pageTitle = pageTitles[fromPage].title || "ERROR";
  const pageMessage = pageTitles[fromPage].message || "ERROR";

  return (
    <div className="-z-10 w-full h-screen bg-teal-50 flex flex-col justify-center items-center">
      <CheckCircleIcon className="w-16 h-16 fill-gray-50 mb-8" />
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-spBold tracking-tighter text-gray-50">
          {pageTitle}
        </h1>
        <p className="font-spMedium text-gray-5 tracking-tight text-center text-gray-50 leading-5">
          {pageMessage}
        </p>
      </div>
      <div className="flex gap-x-4">
        <img src="./appStore.png" className="w-32 h-10" />
        <img src="./googlePlay.png" className="w-32 h-10" />
      </div>
    </div>
  );
};
