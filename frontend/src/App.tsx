import AppRouter from "./routes/AppRoute.tsx";
import { Toaster } from "react-hot-toast";

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
