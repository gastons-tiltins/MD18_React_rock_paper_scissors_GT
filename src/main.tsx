import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// import i18n (needs to be bundled ;))
import './components/i18n/i18n';

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);
