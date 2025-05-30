import SettingsWidget from '@components/layout/SettingsWidget';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <SettingsWidget isAdmin />
            </QueryClientProvider>
        </>
    );
}

export default appWithTranslation(App);
