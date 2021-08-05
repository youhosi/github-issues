import { QueryResponseCache } from "relay-runtime";
import nextConfig from "next/config";

const { __RELAY_TTL__, __API__, __TOKEN__ } = nextConfig().publicRuntimeConfig;

const cache = new QueryResponseCache({ size: 250, ttl: __RELAY_TTL__ });

const fetchRelay = async (operation, variables, cacheConfig) => {
    const { name, text: queryID, operationKind } = operation;

    const isMutation = operationKind === "mutation";
    const isQuery = operationKind === "query";
    const isForceFetch = cacheConfig?.force;

    const fromCache = cache.get(queryID, variables);

    if (isQuery && fromCache !== null && !isForceFetch) {
        return fromCache;
    }

    const response = await fetch(__API__, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${__TOKEN__}`,
        },
        body: JSON.stringify({ query: operation.text, variables }),
    });

    const json = await response.json();

    if (Array.isArray(json.errors)) {
        const jsonVariables = JSON.stringify(variables);
        const jsonErrors = JSON.stringify(json.errors);

        throw new Error(`Error fetching GraphQL query '${name}' with variables '${jsonVariables}': ${jsonErrors}`);
    }

    if (isQuery && json) cache.set(queryID, variables, json);
    if (isMutation) cache.clear();

    return json;
};

export default fetchRelay;
