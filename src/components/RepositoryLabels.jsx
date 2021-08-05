import React from "react";
import PropTypes from "prop-types";
import { PlusIcon } from "@primer/octicons-react";

import { graphql, useFragment } from "lib/relay";
import { colors } from "../theme/theme";

const RepositoryLabels = ({ repository }) => {
    const data = useFragment(
        graphql`
            fragment RepositoryLabelsFragment on Repository {
                labels(first: 3) {
                    edges {
                        node {
                            id
                            name
                            color
                        }
                    }
                    pageInfo {
                        hasNextPage
                    }
                }
            }
        `,
        repository
    );

    const { edges: labels, pageInfo } = data?.labels;

    return (
        <ul className="labels">
            {labels.map(({ node }) => (
                <li key={node.id} className="labels__item">
                    <i style={{ backgroundColor: `#${node.color}` }} className="labels__circle" />

                    {node.name}
                </li>
            ))}

            {pageInfo?.hasNextPage && <PlusIcon size={12} fill={colors.grey["200"]} />}

            <style jsx>{`
                .labels {
                    display: flex;
                    align-items: center;
                    justify-items: flex-start;
                    list-style-type: none;
                    padding: 0;

                    &__item {
                        position: relative;
                        font-size: 1.4rem;
                        color: ${colors.grey["200"]};
                        border: 1px solid ${colors.grey["300"]};
                        list-style-type: none;
                        border-radius: 24px;
                        padding: 0 8px 0 22px;
                        height: 24px;
                        margin-right: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: flex-end;

                        &:last-of-type {
                            margin-right: 12px;
                        }
                    }

                    &__circle {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                    }
                }
            `}</style>
        </ul>
    );
};

RepositoryLabels.propTypes = {
    repository: PropTypes.object.isRequired,
};

export default RepositoryLabels;
