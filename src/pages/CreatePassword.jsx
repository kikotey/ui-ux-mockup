import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, PasswordStrengthMeter } from "../components";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createPasswordRoute, successRoute } from "../routing/routes";

export const CreatePassword = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: createPasswordRoute.id });

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { t } = useTranslation();

  const { password, confirmPassword } = formData;

  const {
    register,
    watch,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: "",
  });

  const onSubmit = async (form) => {
    console.log("Form submitted:", form);
    navigate({ to: successRoute.id, search: { from: "createPassword" } });
  };

  const watchPassword = watch("password", "");

  return (
    <div className="max-w-5xl w-full h-full pt-24 px-5 pb-5 flex flex-col gap-y-5">
      <p className="font-spMedium text-3xl tracking-tighter">
        {t("createPassword.title")}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full justify-between"
      >
        <div className="flex flex-col gap-y-2">
          <Input
            name="password"
            type="password"
            label={t("createPassword.password")}
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400 stroke-2" />}
            placeholder={t("createPassword.passwordPlaceholder")}
            register={register}
            registerOptions={{
              required: t("createPassword.passwordRequired"),
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
          <Input
            name="confirmPassword"
            type="password"
            label={t("createPassword.confirmPassword")}
            icon={<LockClosedIcon className="h-5 w-5 text-gray-400 stroke-2" />}
            placeholder={t("createPassword.confirmPasswordPlaceholder")}
            register={register}
            registerOptions={{
              required: t("createPassword.confirmPasswordRequired"),
              validate: {
                matchesPassword: (value) =>
                  value === watchPassword || "Passwords do not match",
              },
            }}
            value={confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <PasswordStrengthMeter password={password} />
        </div>
        <div className="w-full flex flex-col gap-y-2 mt-3">
          <Button children="Submit" type="primary" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};
