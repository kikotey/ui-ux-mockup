import React, { useState } from "react";
import { VerificationCode, Button } from "../components";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { recoveryRoute, successRoute } from "../routing/routes";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

export const Recovery = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const search = useSearch({ from: recoveryRoute.id });

  const [sixDigitCode, setSixDigitCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);

  const handleVerificationCodeChange = (code) => {
    setSixDigitCode(code);
  };

  const handleVerificationCodeComplete = (code) => {
    const isCorrect = code === search.phoneCode || code === search.emailCode;
    setIsCodeCorrect(isCorrect);
    if (isCorrect) {
      setTimeout(() => {
        navigate({ to: successRoute.id, search: { from: "recovery" } });
      }, 2000);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between items-center pb-5">
      <div className="max-w-5xl w-full h-full pt-24 px-5 flex flex-col items-center">
        <h1 className="text-4xl font-spBold tracking-tighter text-black-300 mb-12 text-center">
          {search.phoneCode
            ? t("recovery.titlePhone")
            : t("recovery.titleEmail")}
        </h1>
        <p className="w-64 font-spMedium text-gray-5 tracking-tight text-black-200 text-center mb-8 leading-4">
          {search.phoneCode.length === 6
            ? t("recovery.messagePhone", {
                phone: search.phone,
              })
            : t("recovery.messageEmail", {
                email: search.email,
              })}
        </p>
        <VerificationCode
          fields={6}
          onChange={handleVerificationCodeChange}
          onComplete={handleVerificationCodeComplete}
          disabled={isCodeCorrect}
        />
        {!isCodeCorrect && sixDigitCode.length === 6 && (
          <div className="flex w-full justify-center mt-8">
            <MinusCircleIcon className="h-6 w-6 stroke-alert-100 fill-alert-50" />
            <p className="ml-2 font-spMedium text-alert-100">
              Wrong code. Please retry.
            </p>
          </div>
        )}
      </div>
      <Button
        children="Resend a new code"
        type="secondary"
        className="!w-fit py-2 px-5 flex"
      />
    </div>
  );
};
