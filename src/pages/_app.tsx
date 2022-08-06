import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';
import { AppType } from 'next/dist/shared/lib/utils';
import Navbar from '../components/navbar';
import { SessionProvider } from 'next-auth/react';
// import Footer from 'components/footer';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <div>
            <SessionProvider session={session}>
                <Navbar />
                <Component {...pageProps} />
            </SessionProvider>
            {/* <div className="flex-1 overflow-y-auto py-2 px-4"> */}
            {/* </div> */}
            {/* <Footer /> */}
        </div>
    );
};

const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return '';
    }
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = `${getBaseUrl()}/api/trpc`;

        return {
            url
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false
})(MyApp);
