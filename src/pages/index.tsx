import Spinner from '../components/spinner';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';

const Home: NextPage = () => {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Please log in</h2>
                    </div>
                    <div className="flex grow flex-col items-center justify-center">
                        <button
                            onClick={() => signIn('google')}
                            className="flex items-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span>Sign in with Google</span>
                            <FaGoogle />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <p>Hello, from Vercel</p>
            <hr />
            <Spinner />
        </div>
    );
};

export default Home;
