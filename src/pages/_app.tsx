import React, { useEffect, useMemo, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
// import { ToastNotification } from 'core/component/toastNotification';
import storeConfig, { wrapperStore } from 'core/redux/store';
import { SiteLayout } from 'core/component/siteLayout';
import { GLOBAL_CONST } from 'consts';

import '../../styles/_index.scss';
import '../../styles/globals.css';

import 'moment/locale/en-gb';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const renderComp = useMemo(() => {
        // if (loading) return <Loading />;
        // if (!access_token) return <Page403 />;
        // if (isDisconect) return <ErrorScreen.DisconectNetwork />;
        return (
            <SiteLayout>
                <Component key={router.asPath} {...pageProps} />
                {/* <ToastNotification /> */}
            </SiteLayout>
        );
    }, [Component, pageProps, router.asPath]);

    return (
        // V3
        <>
            <Head>
                <title>Loading</title>
                <link rel="stylesheet" href="https://unpkg.com/react-day-picker@7.4.8/lib/style.css" />
            </Head>
            <PersistGate persistor={storeConfig().__PERSISTOR}>{renderComp}</PersistGate>

            <div id="portal-container" />
        </>
    );
}

// High Order Component to wrap Auth0Provider
function HOCAuth({ Component, pageProps, router }: AppProps) {
    return <App pageProps={pageProps} Component={Component} router={router} />;
}

export default wrapperStore.withRedux(HOCAuth);
