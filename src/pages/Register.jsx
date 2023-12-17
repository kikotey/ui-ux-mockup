import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, PasswordStrengthMeter } from "../components";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { clsx } from "clsx";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { newKratosUser } from "../api";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { recoveryRoute, registerRoute } from "../routing/routes";
import { emailValidator } from "../helpers/profileValidator";

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

export const Register = () => {
  const navigate = useNavigate();
  const [phoneCountryCode, phoneCountryCodeSetter] = useState("DE");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    password: "",
  });
  
  const search = useSearch({ from: registerRoute.id });

  const { t } = useTranslation();

  const { firstName, lastName, email, countryCode, phone, password } = formData;

  const payload = {
    method: "password",
    password: password,
    traits: {
      email: email,
      country_code_phone: countryCode,
      phone: phone,
      phone_validated: "false",
      onboarding_done: "false",
      name: {
        first: firstName,
        last: lastName,
      },
      full_name: firstName + " " + lastName,
      lang: "EN",
      accepted_tos: "true",
      roles: {
        organizations: [],
        scopes: [],
        private_account: [],
        affiliate_account: [],
      },
      retry_controle: {
        totp_sms_numbers_retried: "0",
        totp_email_numbers_retried: "0",
      },
    },
  };

  const onSubmit = async (form) => {
    console.log("Form submitted:", form);
    const email = form.email;
    const emailCode = form.phoneCode;
    const phone = form.phone;
    const phoneCode = form.emailCode;
    navigate({
      to: recoveryRoute.fullPath,
      search: { email, emailCode, phone, phoneCode },
    });

    const sdk = newKratosUser();

    const { data: flow } = await sdk.createBrowserRegistrationFlow();

    console.log(flow);

    try {
      let { data } = await sdk.updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
          method: "password",
          password: password,
          traits: payload,
        },
      });
      console.log("DATA: ", data);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    watch,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: search,
  });

  console.log({ errors });

  return (
    <div className="max-w-5xl w-full h-full pt-24 px-5 flex flex-col gap-y-5">
      <p className="font-spMedium text-3xl tracking-tighter">
        {t("register.title")}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div>
          <Input
            name="firstName"
            label={t("register.firstname")}
            icon={<UserIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder={t("register.firstnamePlaceholder")}
            register={register}
            registerOptions={{
              required: t("register.firstnameRequired"),
              minLength: {
                value: 1,
                message: t("register.firstnameRequired"),
              },
            }}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
          <Input
            name="lastName"
            label={t("register.lastname")}
            icon={<UserIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder={t("register.lastnamePlaceholder")}
            register={register}
            registerOptions={{
              required: t("register.lastnameRequired"),
              minLength: {
                value: 1,
                message: t("register.lastnameRequired"),
              },
            }}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
          <Input
            name="email"
            label={t("register.email")}
            icon={<EnvelopeIcon className="h-5 w-5 stroke-gray-800 stroke-2" />}
            placeholder={t("register.emailPlaceholder")}
            register={register}
            registerOptions={{
              required: t("register.emailRequired"),
              validate: (value) => {
                return emailValidator(value, t);
              },
            }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!!search.email}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Controller
            name="phone"
            rules={{
              validate: {
                isValid: (value) => {
                  console.log("value: ", value);
                  if (value) {
                    const callingCode = getCountryCallingCode(phoneCountryCode);
                    if (!new RegExp(`^\\+${callingCode}$`).test(value)) {
                      return !!parsePhoneNumber(value);
                    }
                  }
                  return true;
                },
              },
              required: true,
            }}
            control={control}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block font-spSemiBold text-black-300">
                  {t("register.phone")}
                </label>
                <PhoneInput
                  {...field}
                  onChange={(v) => field.onChange(v)}
                  onCountryChange={(v) => phoneCountryCodeSetter(v)}
                  limitMaxLength={true}
                  international={true}
                  defaultCountry="DE"
                  className={clsx(
                    inputStyle,
                    "w-full flex pl-6 gap-x-3",
                    search.phone && "!bg-gray-300"
                  )}
                  disabled={!!search.phone}
                />
              </div>
            )}
          />
          <Input
            name="password"
            type="password"
            label={t("register.password")}
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400 stroke-2" />}
            placeholder={t("register.passwordPlaceholder")}
            register={register}
            registerOptions={{
              required: t("register.passwordRequired"),
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long",
              },
            }}
            value={password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <PasswordStrengthMeter password={password} />
        </div>
        <div className="w-full flex flex-col gap-y-2 mt-3">
          <p className="font-spMedium text-xs text-gray-800 mb-2">
            {t("register.registerConditions")}
          </p>
          <Button children="Submit" type="primary" className="mb-5" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};
