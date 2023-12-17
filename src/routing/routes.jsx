import React from "react";
import { Router, Route, RootRoute, Outlet } from "@tanstack/react-router";
import {
  CreatePassword,
  Recovery,
  Register,
  Sponsorship,
  Success,
} from "../pages";
import { Header } from "../components";

const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      <Header />
      <div className="absolute w-full h-full flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
}

export const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  validateSearch: (search) => {
    return {
      phone: search.phone || "",
      phoneCode: search.phoneCode || "",
      email: search.email || "",
      emailCode: search.emailCode || "",
    };
  },
  component: Register,
});

export const recoveryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/recovery",
  validateSearch: (search) => {
    return {
      phoneCode: search.phoneCode || "",
      emailCode: search.emailCode || "",
    };
  },
  component: Recovery,
});

const sponsorshipRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Sponsorship,
});

export const successRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/success",
  validateSearch: (search) => {
    return { from: search.from || "" };
  },
  component: Success,
});

export const createPasswordRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/createPassword",
  component: CreatePassword,
});

const routeTree = rootRoute.addChildren([
  registerRoute,
  recoveryRoute,
  sponsorshipRoute,
  successRoute,
  createPasswordRoute,
]);

export const router = new Router({ routeTree });
