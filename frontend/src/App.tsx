import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./routes/AppRoute.tsx";
import { Toaster } from "react-hot-toast";
// import { persistor } from "./store/store.ts";
import { useEffect } from "react";
// import { fetchCurrentUser } from "./features/auth/auth.thunks.ts";
import { useAppDispatch } from "./hooks/hooks.ts";

// const AppInit = () => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   return null;
// };

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <AppRouter />
    </>
  );
};
export default App;
