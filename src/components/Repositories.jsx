import React from "react";
import PropTypes from "prop-types";

import Repository from "components/Repository";
import FetchMoreButton from "components/FetchMoreButton";
import { graphql, usePaginationFragment } from "lib/relay";
import { colors } from "theme/theme";

const Repositories = ({ viewer }) => {
    const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment(
        graphql`
            fragment RepositoriesFragment on User
            @argumentDefinitions(count: { type: "Int", defaultValue: 5 }, cursor: { type: "String" })
            @refetchable(queryName: "RepositoriesPaginationQuery") {
                repositories(first: $count, after: $cursor, orderBy: { field: CREATED_AT, direction: DESC })
                    @connection(key: "RepositoriesFragment_repositories") {
                    edges {
                        cursor
                        node {
                            ...RepositoryFragment
                        }
                    }
                }
            }
        `,
        viewer
    );

    const repositories = data?.repositories?.edges;

    return (
        <>
            <ul className="repositories__list">
                {repositories.map((repository) => (
                    <Repository key={repository.cursor} repository={repository.node} />
                ))}
            </ul>

            {hasNext && (
                <div className="pagination">
                    <FetchMoreButton onClick={() => loadNext(5)} isLoading={isLoadingNext} />
                </div>
            )}

            <style jsx>
                {`
                    .repositories__list {
                        box-shadow: 0 1px 3px ${colors.grey["300"]};
                        border-radius: 3px;
                        list-style-type: none;
                        padding: 0;
                    }

                    .pagination {
                        display: flex;
                        margin: 20px auto;
                        justify-content: center;
                    }
                `}
            </style>
        </>
    );
};

Repositories.propTypes = {
    viewer: PropTypes.object.isRequired,
};

export default Repositories;
