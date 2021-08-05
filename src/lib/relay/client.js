/* eslint-disable import/prefer-default-export */

import { Environment, Network, RecordSource, Store } from "relay-runtime";
import nextConfig from "next/config";

import fetchRelay from "./fetchRelay";

const { __RELAY_TTL__ } = nextConfig().publicRuntimeConfig;

let environment = null;

export const relayClientEnvironment = (relay) => {
    if (environment) return environment;

    const source = new RecordSource(relay);
    const store = new Store(source, { gcReleaseBufferSize: 10, queryCacheExpirationTime: __RELAY_TTL__ });
    const network = Network.create(fetchRelay);

    environment = new Environment({
        configName: "Relay Client",
        isServer: false,
        network,
        store,
    });

    return environment;
};
