import Spinner from '../components/spinner';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <div>
            <p>Hello, from Vercel</p>
            <hr />
            <Spinner />
        </div>
    );
};

export default Home;
