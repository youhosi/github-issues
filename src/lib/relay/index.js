/* eslint-disable global-require */

const __SERVER__ = typeof window === "undefined";

export const { relayServerEnvironment, relayClientEnvironment } = __SERVER__
    ? require("./server")
    : require("./client");

export const relaySSR = __SERVER__ && require("./ssr").default;

export {
    RelayEnvironmentProvider,
    useRelayEnvironment,
    useLazyLoadQuery,
    usePaginationFragment,
    useRefetchableFragment,
    useFragment,
    useMutation,
    graphql,
    loadQuery,
    fetchQuery,
} from "react-relay/hooks";
export { ConnectionHandler } from "relay-runtime";
