import SettingsWidget from '@components/layout/SettingsWidget';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { UserProvider } from '@provider/UserProvider';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Component {...pageProps} />
                    <SettingsWidget />
                </UserProvider>
            </QueryClientProvider>
        </>
    );
}

export default appWithTranslation(App);
