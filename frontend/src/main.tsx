import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
const queryClient = new QueryClient();
import { store } from './store/store.ts'
import { Provider } from 'react-redux'

const root  = createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </StrictMode>

)
