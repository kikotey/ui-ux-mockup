import clsx from "clsx";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const PasswordStrengthMeter = ({ password }) => {
  const { t, i18n } = useTranslation();
  const weakPassword = new RegExp("^.{1,7}$");
  const simplePassword = new RegExp("^[a-zA-Z]{8,}$");
  const mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );
  const almostStrongPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"
  );
  const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const strengthChecker = (password) => {
    if (strongPassword.test(password)) {
      return "green";
    } else if (almostStrongPassword.test(password)) {
      return "blue";
    } else if (mediumPassword.test(password)) {
      return "blue";
    } else if (simplePassword.test(password)) {
      return "yellow";
    } else if (weakPassword.test(password)) {
      return "red";
    } else {
      return "gray";
    }
  };

  const color = useMemo(() => strengthChecker(password), [password]);

  return (
    <div className="w-full flex flex-col mt-2">
      <div className="w-full flex flex-col gap-y-2">
        <p className="font-spMedium text-xs text-gray-800">
          {t("register.yourPasswordHas")}
        </p>
        <div className="flex gap-y-0 flex-col">
          <p className="font-spMedium text-xs text-gray-800">
            • {t("register.characters")}
          </p>
          <p className="font-spMedium text-xs text-gray-800">
            • {t("register.goodStrength")}
          </p>
        </div>
        <p className="font-spMedium text-xs text-gray-800 mb-2">
          {t("register.passwordStrength")}
        </p>
      </div>
      <div className="w-full flex gap-x-2 py-2">
        <div
          className={clsx(
            "w-1/5 h-1 rounded-full ",
            color === "red" && "bg-alert-50",
            color === "yellow" && "bg-yellow-50",
            color === "blue" && "bg-blue-50",
            color === "green" && "bg-green-50",
            color === "gray" && "bg-gray-300"
          )}
        ></div>
        <div
          className={clsx(
            "w-1/5 h-1 rounded-full ",
            color === "yellow" && "bg-yellow-50",
            color === "blue" && "bg-blue-50",
            color === "green" && "bg-green-50",
            color === "gray" && "bg-gray-300"
          )}
        ></div>
        <div
          className={clsx(
            "w-1/5 h-1 rounded-full ",
            color === "blue" && "bg-blue-50",
            color === "green" && "bg-green-50",
            color === "gray" && "bg-gray-300"
          )}
        ></div>
        <div
          className={clsx(
            "w-1/5 h-1 rounded-full ",
            color === "blue" && "bg-blue-50",
            color === "green" && "bg-green-50",
            color === "gray" && "bg-gray-300"
          )}
        ></div>
        <div
          className={clsx(
            "w-1/5 h-1 rounded-full ",
            color === "green" && "bg-green-50",
            color === "gray" && "bg-gray-300"
          )}
        ></div>
      </div>
      <p className="font-spMedium text-xs text-gray-800">
        {t("register.passwordMessage")}
      </p>
    </div>
  );
};
