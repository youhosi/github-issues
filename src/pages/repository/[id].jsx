import React from "react";
import PropTypes from "prop-types";

import { useLazyLoadQuery, graphql, relaySSR, fetchQuery } from "lib/relay";

const RepositoryIdPage = ({ repositoryId }) => {
    const { repository } = useLazyLoadQuery(
        graphql`
            query Id_repositoryQuery($repositoryId: ID!) {
                repository: node(id: $repositoryId) {
                    ... on Repository {
                        name
                        description
                    }
                }
            }
        `,
        { repositoryId },
        { fetchPolicy: "store-or-network" }
    );

    return (
        <>
            <span>Github issue: {repository.name}</span>
            <span>{repository.description}</span>
        </>
    );
};

export const getServerSideProps = relaySSR(async ({ query, environment }) => {
    const repositoryIdQuery = await import("generated/relay/Id_repositoryQuery.graphql");
    const { id: repositoryId } = query;

    await fetchQuery(environment, repositoryIdQuery, { repositoryId }, { fetchPolicy: "network-only" }).toPromise();

    return {
        props: {
            repositoryId,
        },
    };
});

RepositoryIdPage.propTypes = {
    repositoryId: PropTypes.string.isRequired,
};

export default RepositoryIdPage;
