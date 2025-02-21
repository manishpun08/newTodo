import React from "react";
import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider
} from "react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import mainRoutes from "./Routes/MainRoutes.jsx";
import "./index.css";
import { Provider } from 'react-redux'
import { store } from "./store";


const queryClient = new QueryClient();

const router = createBrowserRouter(mainRoutes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
