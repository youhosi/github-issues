import React from "react";

import Repositories from "components/Repositories";
import { graphql, useLazyLoadQuery, relaySSR, fetchQuery } from "lib/relay";

const indexQuery = graphql`
    query pages_indexQuery {
        viewer {
            ...RepositoriesFragment
        }
    }
`;

const IndexPage = () => {
    const data = useLazyLoadQuery(indexQuery, null, { fetchPolicy: "store-or-network" });

    return (
        <div className="container">
            <div className="repositories">


                <h2>Repositories</h2>

                <Repositories viewer={data.viewer} />
            </div>

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

export const getServerSideProps = relaySSR(async (context) => {
    const { environment } = context;

    await fetchQuery(environment, indexQuery, null, { fetchPolicy: "network-only" }).toPromise();
});

export default IndexPage;
