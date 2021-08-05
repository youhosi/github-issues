import "theme/normalize.css";
import "theme/global.css";

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { RelayEnvironmentProvider, relayClientEnvironment } from "lib/relay";

const App = ({ Component, pageProps: { relay, ...props } }) => {
    const environment = useMemo(() => relayClientEnvironment(relay), []);

    return (
        <>
            <Head>
                <title>Github issues</title>
            </Head>

            <RelayEnvironmentProvider environment={environment}>
                <Component {...props} />
            </RelayEnvironmentProvider>
        </>
    );
};

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.shape({ relay: PropTypes.object }).isRequired,
};

export default App;
