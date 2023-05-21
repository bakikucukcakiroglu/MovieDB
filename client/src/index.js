import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StyledEngineProvider } from '@mui/material/styles';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </QueryClientProvider>
    </React.StrictMode>

);
