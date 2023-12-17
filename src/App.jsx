import React, { Suspense } from 'react';
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routing/routes";

function App() {
  return (
    <Suspense fallback="loading">
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
