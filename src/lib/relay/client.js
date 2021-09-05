/* eslint-disable import/prefer-default-export */

import { Environment, Network, RecordSource, Store } from "relay-runtime";
import nextConfig from "next/config";

import fetchRelay from "./fetchRelay";

const { __RELAY_TTL__ } = nextConfig().publicRuntimeConfig;
const storeConfig = { gcReleaseBufferSize: 8, queryCacheExpirationTime: __RELAY_TTL__ };

let environment = null;

export const relayClientEnvironment = (relay) => {
    if (!environment) {
        const source = new RecordSource(relay);
        const network = Network.create(fetchRelay);
        const store = new Store(source, storeConfig);

        environment = new Environment({
            configName: "Relay Client",
            isServer: false,
            network,
            store,
        });
    }

    if (relay && typeof relay === "object") {
        environment.getStore().publish(new RecordSource(relay));
    }

    return environment;
};
