import React from 'react';
import Head from 'next/head';
import { DemoPageComponent } from 'domains/demo';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Demo</title>
            </Head>
            <DemoPageComponent />
        </>
    );
};

export default Home;
