import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, Button } from "../components";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { clsx } from "clsx";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { registerRoute } from "../routing/routes";
import { useTranslation } from "react-i18next";

const inputStyle = `
    block
    w-full
    p-4
    rounded-full
    focus:outline-none
    focus:ring
    focus:border-blue-300
    placeholder:text-gray-800
    transition-all
    rounded-full
    pl-11
  `;

export const Sponsorship = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [phoneCountryCode, phoneCountryCodeSetter] = useState("FR");

  const onSubmit = (e) => {
    console.log({ e });
    const { email, phone, phoneCode, emailCode } = e;
    navigate({
      to: registerRoute.fullPath,
      search: { email, phone, phoneCode, emailCode },
    });
  };

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <div className="max-w-5xl w-full h-full pt-24 px-5 pb-5 flex flex-col gap-y-5">
      <p className="font-spMedium text-3xl tracking-tighter">
        {t("sponsorship.title")}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col gap-y-4">
          <Controller
            name="phone"
            rules={{
              validate: {
                isValid: (value) => {
                  if (value) {
                    const callingCode = getCountryCallingCode(phoneCountryCode);
                    if (!new RegExp(`^\\+${callingCode}$`).test(value)) {
                      return !!parsePhoneNumber(value);
                    }
                  }
                  return true;
                },
              },
            }}
            control={control}
            render={({ field }) => (
              <div>
                <label className="block font-spSemiBold text-black-300">
                  {t("sponsorship.phone")}
                </label>
                <PhoneInput
                  {...field}
                  onChange={(v) => field.onChange(v)}
                  onCountryChange={(v) => phoneCountryCodeSetter(v)}
                  limitMaxLength={true}
                  international={true}
                  defaultCountry="DE"
                  className={clsx(inputStyle, "w-full flex pl-6 gap-x-3")}
                />
              </div>
            )}
          />
          <Input
            name="email"
            label={t("sponsorship.email")}
            icon={<EnvelopeIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder="Enter your email adress"
            register={register}
          />
          <Input
            name="emailCode"
            label="Code si email"
            icon={<EnvelopeIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder="Code"
            register={register}
          />
          <Input
            name="phoneCode"
            label="Code si phone"
            icon={<EnvelopeIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder="Code"
            register={register}
          />
        </div>
        <Button children={t("sponsorship.continue")} type="primary" />
      </form>
    </div>
  );
};
