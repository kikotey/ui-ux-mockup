import { useTranslation } from "react-i18next";

const LIST_PROVIDERS = {
  gmail: ["com", "fr", "de", "co.uk", "it", "es"],
  outlook: ["com", "ca", "mx", "eu", "fr"],
  yahoo: ["com", "ca", "mx", "co.uk", "fr"],
  hotmail: ["com", "ca", "mx", "co.uk", "fr"],
  aol: ["com", "ca", "mx", "co.uk", "fr"],
  protonmail: ["com", "ch", "de", "co.uk"],
  zoho: ["com", "eu", "in"],
  orange: ["fr"],
  sfr: ["fr"],
  laposte: ["fr"],
  free: ["fr"],
  wanadoo: ["fr"],
  alice: ["fr"],
  live: ["fr"],
  kikotey: ["com"],
  qmailv: ["com"],
};

export function firstNameValidator(name, t) {
  if (!name) return t("errorFirstNameEmpty");
  return "";
}

export function lastNameValidator(name, t) {
  if (!name) return t("errorLastNameEmpty");
  return "";
}

function splitDomain(domain) {
  const dotIndex = domain?.indexOf(".");
  const firstPart = domain?.substring(0, dotIndex);
  const secondPart = domain?.substring(dotIndex + 1);
  return { firstPart, secondPart };
}

export function emailValidator(email, t) {
  if (!email) return t("errorEmailEmpty");

  const emailParts = email?.split("@");
  if (emailParts?.length !== 2) return t("errorEmailServer");

  const [emailName, emailDomain] = emailParts;
  const { firstPart, secondPart } = splitDomain(emailDomain);
  const allowedExtensions = LIST_PROVIDERS[firstPart];
  if (!allowedExtensions?.includes(secondPart) || !emailName)
    return t("errorEmailNotValid");

  return true;
}

export function passwordValidator(password, t) {
  const isEightDigits = password?.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isStrong = isEightDigits && hasUppercase && hasLowercase && hasNumber;
  if (!password) return t("errorPasswordEmpty");
  if (password && !isStrong) return t("errorPasswordNotValid");
  return "";
}

export function phoneValidator(phone, t) {
  const re =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\(?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  if (!phone) return t("errorPhoneEmpty");
  if (!re.test(phone)) return t("errorPhoneNotValid");
  return "";
}
