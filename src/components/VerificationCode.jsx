import React, { createRef, useState } from "react";

const DEFAULT_ON_FUNCTION = () => {};

export const VerificationCode = ({
  disabled = false,
  className,
  error = false,
  fields = 4,
  initialValue = "",
  inputId,
  onChange = DEFAULT_ON_FUNCTION,
  onComplete = DEFAULT_ON_FUNCTION,
  placeholder = "",
  required = false,
  type = "number",
  "data-testid": dataTestId,
  "aria-label": ariaLabel = "Verification code",
}) => {
  const valuesArray = Object.assign(
    new Array(fields).fill(""),
    initialValue.substring(0, fields).split("")
  );
  const [values, setValues] = useState(valuesArray);

  const inputRefs = Array.from({ length: fields }, () => createRef());

  const triggerChange = (inputValues) => {
    const stringValue = inputValues.join("");
    if (onChange) {
      onChange(stringValue);
    }
    if (onComplete && stringValue.length >= fields) {
      onComplete(stringValue);
    }
  };

  const inputOnChange = (index) => (event) => {
    let { value } = event.target;
    if (type === "number") {
      value = event.target.value.replace(/[^\d]/gi, "");
    }
    const newValues = [...values];

    if (
      value === "" ||
      (type === "number" && !new RegExp(event.target.pattern).test(value))
    ) {
      newValues[index] = "";
      setValues(newValues);
      return;
    }

    const sanitizedValue = value[0];
    newValues[index] = sanitizedValue;
    setValues(newValues);
    const nextIndex = Math.min(index + 1, fields - 1);
    const next = inputRefs[nextIndex];

    next?.current?.focus();

    triggerChange(newValues);
  };

  const inputOnKeyDown = (index) => (event) => {
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const first = inputRefs[0];
    const last = inputRefs[inputRefs.length - 1];
    const prev = inputRefs[prevIndex];
    const next = inputRefs[nextIndex];
    const vals = [...values];

    switch (event.key) {
      case "Backspace":
        event.preventDefault();
        if (values[index]) {
          vals[index] = "";
          setValues(vals);
          triggerChange(vals);
        } else if (prev) {
          vals[prevIndex] = "";
          prev?.current?.focus();
          setValues(vals);
          triggerChange(vals);
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        prev?.current?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        next?.current?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        first?.current?.focus();
        break;
      case "ArrowDown":
        event.preventDefault();
        last?.current?.focus();
        break;
      default:
        break;
    }
  };

  const inputOnFocus = (event) => event.target.select();

  const inputOnPaste = (currentIndex) => (event) => {
    event.preventDefault();
    const pastedValue = [...event.clipboardData.getData("Text").split("")].map(
      (copiedValue) =>
        type === "number" ? copiedValue.replace(/[^\d]/gi, "") : copiedValue
    );

    pastedValue.splice(
      fields - currentIndex < pastedValue.length
        ? fields - currentIndex
        : pastedValue.length
    );

    setValues((vals) => {
      const newArray = vals.slice();
      newArray.splice(currentIndex, pastedValue.length, ...pastedValue);

      return newArray;
    });

    const nextIndex = Math.min(
      currentIndex + pastedValue.filter((item) => item !== "").length,
      inputRefs.length - 1
    );
    const next = inputRefs[nextIndex];
    next?.current?.focus();
    triggerChange(pastedValue);
  };

  return (
    <div className={`flex ${className}`} data-testid={dataTestId}>
      {values.map((value, index) => (
        <input
          className={`font-spSemiBold leading-none text-teal-300 text-2xl xs:text-4xl border-2 rounded-2xl bg-teal-30 text-center mr-1 w-10 h-14 xs:w-14 xs:h-18 outline-none transition duration-200 ${
            error
              ? "border-alert"
              : "border-teal-40 hover:border-teal-50 focus:border-teal-100"
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          data-testid={index}
          value={value}
          id={`${inputId || ""}-${index}`}
          ref={inputRefs[index]}
          onChange={inputOnChange(index)}
          onKeyDown={inputOnKeyDown(index)}
          onPaste={inputOnPaste(index)}
          onFocus={inputOnFocus}
          disabled={disabled}
          required={required}
          placeholder={placeholder?.[index] ?? ""}
          aria-label={`${ariaLabel} ${index}`}
        />
      ))}
    </div>
  );
};
