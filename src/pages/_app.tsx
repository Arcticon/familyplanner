import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';
import { AppType } from 'next/dist/shared/lib/utils';
import Navbar from '../components/navbar';
// import Footer from 'components/footer';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <div>
            <Navbar />
            {/* <div className="flex-1 overflow-y-auto py-2 px-4"> */}
            <Component {...pageProps} />
            {/* </div> */}
            {/* <Footer /> */}
        </div>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                url: '/api/trpc'
            };
        }
        // during SSR below

        // optional: use SSG-caching for each rendered page (see caching section for more details)
        const ONE_DAY_SECONDS = 60 * 60 * 24;
        ctx?.res?.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`);

        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        const url = 'http://localhost:3000/api/trpc';

        return {
            url,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
            headers: {
                // optional - inform server that it's an ssr request
                'x-ssr': '1'
            }
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false
})(MyApp);
