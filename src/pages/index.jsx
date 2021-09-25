import React from "react";

import Repositories from "components/Repositories";
import { useLazyLoadQuery, graphql, relaySSR, fetchQuery } from "lib/relay";

const IndexPage = () => {
    const data = useLazyLoadQuery(
        graphql`
            query pages_indexQuery {
                viewer {
                    ...Repositories
                }
            }
        `,
        null,
        { fetchPolicy: "store-or-network" }
    );

    return (
        <div className="container">
            <Repositories viewer={data.viewer} />

            <div className="recent-issues">
                <h2>Recent Issues</h2>
            </div>

            <style jsx>{`
                .container {
                    width: 100%;
                    max-width: 940px;
                    display: block;
                    margin: 50px auto 0;
                    padding: 0 20px;
                }
            `}</style>
        </div>
    );
};

export const getServerSideProps = relaySSR(async ({ environment }) => {
    const indexQuery = await import("generated/relay/pages_indexQuery.graphql");

    await fetchQuery(environment, indexQuery, null, { fetchPolicy: "network-only" }).toPromise();
});

export default IndexPage;
