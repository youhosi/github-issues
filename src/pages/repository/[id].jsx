import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { relaySSR, fetchQuery, graphql, useLazyLoadQuery } from "lib/relay";

const repositoryQuery = graphql`
    query Id_repositoryQuery($repositoryId: ID!) {
        repository: node(id: $repositoryId) {
            ... on Repository {
                id
                name
            }
        }
    }
`;

const RepositoryId = (props) => {
    const { id } = useRouter().query;
    // const data = useLazyLoadQuery(repositoryQuery, { repositoryId: id }, { fetchPolicy: "store-only" });

    return (
        <div>
            <Link href="/repository/test">Test</Link> <br />
            Page: {props.test}
        </div>
    );
};

export const getServerSideProps = relaySSR(async (context) => {
    // const { query, environment } = context;

    // await fetchQuery(
    //     environment,
    //     repositoryQuery,
    //     { repositoryId: query.id },
    //     { fetchPolicy: "network-only" }
    // ).toPromise();

    return {
        props: {
            test: `@@@ TEST @@@ ${Date.now()}`,
        },
    };
});

export default RepositoryId;
