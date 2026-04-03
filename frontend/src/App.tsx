import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./routes/AppRoute.tsx";
import { Toaster } from "react-hot-toast";
import { persistor } from "./store/store.ts";

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
      <AppRouter />
    </PersistGate>
  );
};
export default App;
