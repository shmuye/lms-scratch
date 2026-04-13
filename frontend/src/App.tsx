import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./routes/AppRoute.tsx";
import { Toaster } from "react-hot-toast";
import { persistor } from "./store/store.ts";
import { useEffect } from "react";
import { fetchCurrentUser } from "./features/auth/auth.thunks.ts";
import { useAppDispatch, useAppSelector } from "./hooks/hooks.ts";
import Loader from "./components/Loader"; // your loader

// ✅ Handles initial auth sync
// const AppInit = () => {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   return null;
// };

// ✅ Gate UI until auth is ready
// const AppContent = () => {
//   const { loading } = useAppSelector((state) => state.auth);

//   if (loading) {
//     return <Loader />; // prevents flicker
//   }

//   return <AppRouter />;
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

      <PersistGate loading={<Loader />} persistor={persistor}>
        {/* <AppInit /> */}
        <AppRouter />
      </PersistGate>
    </>
  );
};

export default App;
