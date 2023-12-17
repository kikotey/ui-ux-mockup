import { Configuration, FrontendApi, IdentityApi } from "@ory/kratos-client";
import axios from "axios";

export const newKratosUser = (
  projectURL = "https://playground.projects.oryapis.com"
) =>
  new FrontendApi(
    new Configuration({
      basePath: projectURL,
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with Ory Kratos' security detection.
        withCredentials: false,

        // Timeout after 5 seconds.
        timeout: 10000,
      },
    }),
    "",
    // Ensure that we are using the axios client with retry.
    axios
  );

export const newKratosAdmin = (
  projectURL = "https://playground.projects.oryapis.com/"
) =>
  new IdentityApi(
    new Configuration({
      basePath: projectURL,
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with Ory Kratos' security detection.
        withCredentials: false,

        // Timeout after 5 seconds.
        timeout: 10000,
      },
    }),
    "",
    // Ensure that we are using the axios client with retry.
    axios
  );
