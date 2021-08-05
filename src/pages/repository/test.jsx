import React from "react";
import Link from "next/link";
import { relaySSR, fetchQuery, graphql } from "lib/relay";

const testQuery = graphql`
    query testQuery {
        viewer {
            id
            __typename
        }
    }
`;

const RepositoryTest = () => {
    return <Link href="/repository/213">await fetchQuery(context.environment, testQuery, null).toPromise();</Link>;
};

export const getServerSideProps = relaySSR(async (context) => {
    await fetchQuery(context.environment, testQuery, null).toPromise();
});

export default RepositoryTest;
