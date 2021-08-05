import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetchRelay from "./fetchRelay";

export const relayClientEnvironment = (relay) => {
    const source = new RecordSource(relay);
    const store = new Store(source);

    return new Environment({
        network: Network.create(() => Promise.resolve()),
        configName: "Relay Bootstrap",
        isServer: true,
        store,
    });
};

export const relayServerEnvironment = () => {
    const source = new RecordSource();
    const store = new Store(source);
    const network = Network.create(fetchRelay);

    return new Environment({
        configName: "Relay Server",
        isServer: true,
        network,
        store,
    });
};
