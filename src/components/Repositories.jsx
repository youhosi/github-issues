import React from "react";
import PropTypes from "prop-types";

import Suspense from "components/Suspense";
import Repository from "components/Repository";
import RepositoryOrder from "components/RepositoryOrder";
import FetchMoreButton from "components/FetchMoreButton";
import { graphql, usePaginationFragment } from "lib/relay";
import { colors } from "theme/theme";

const Repositories = ({ viewer }) => {
    const { data, hasNext, isLoadingNext, loadNext, refetch } = usePaginationFragment(
        graphql`
            fragment Repositories on User
            @argumentDefinitions(
                count: { type: "Int", defaultValue: 5 }
                cursor: { type: "String" }
                orderBy: { type: "RepositoryOrder" }
            )
            @refetchable(queryName: "RepositoriesRefetchQuery") {
                repositories(first: $count, after: $cursor, orderBy: $orderBy)
                    @connection(key: "RepositoriesFragment_repositories") {
                    edges {
                        node {
                            id
                            ...Repository
                        }
                    }
                }
            }
        `,
        viewer
    );

    const repositories = data?.repositories?.edges || [];

    return (
        <div className="repositories">
            <div className="repositories__header">
                <h2>Repositories</h2>

                <RepositoryOrder refetch={refetch} />
            </div>

            <ul className="repositories__list">
                <Suspense>
                    {repositories.map((repository) => (
                        <Repository key={repository.node.id} repository={repository.node} />
                    ))}
                </Suspense>
            </ul>

            {hasNext && (
                <div className="pagination">
                    <FetchMoreButton onClick={() => loadNext(5)} isLoading={isLoadingNext} />
                </div>
            )}

            <style jsx>
                {`
                    .repositories {
                        margin: 0 0 40px;

                        &__header {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 20px;

                            > h2 {
                                margin: 0;
                            }
                        }

                        &__list {
                            box-shadow: 0 1px 3px ${colors.grey["300"]};
                            border-radius: 3px;
                            list-style-type: none;
                            padding: 0;
                        }
                    }

                    .pagination {
                        display: flex;
                        margin: 20px auto;
                        justify-content: center;
                    }
                `}
            </style>
        </div>
    );
};

Repositories.propTypes = {
    viewer: PropTypes.object.isRequired,
};

export default Repositories;
