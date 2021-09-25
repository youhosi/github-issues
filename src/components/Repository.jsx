import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { ChevronRightIcon } from "@primer/octicons-react";

import Labels from "components/RepositoryLabels";
import Owner from "components/RepositoryOwner";
import { graphql, useFragment } from "lib/relay";
import { colors } from "theme/theme";

const Repository = ({ repository }) => {
    const { repositoryId, name, ...data } = useFragment(
        graphql`
            fragment Repository on Repository {
                repositoryId: id
                name
                ...RepositoryLabels
                ...RepositoryOwner
            }
        `,
        repository
    );

    return (
        <li className="repositories__item repository">
            <Link href={`/repository/${repositoryId}`} passHref>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="repository__link">
                    <div className="repository__meta">
                        <span className="repository__name">{name}</span>
                        <Labels repository={data} />
                    </div>

                    <div className="repository__chevron">
                        <div className="repository__owner">
                            <Owner owner={data} />
                        </div>

                        <ChevronRightIcon size={18} />
                    </div>
                </a>
            </Link>

            <style jsx>
                {`
                    .repositories__item {
                        background-color: ${colors.white};
                        list-style-type: none;
                        margin: 0;
                        padding: 0;
                        overflow: hidden;

                        &:first-child {
                            border-radius: 6px 6px 0 0;
                        }

                        &:last-child {
                            border-radius: 0 0 6px 6px;
                        }
                    }

                    .repository {
                        width: 100%;
                        display: block;
                        border-bottom: 1px solid ${colors.grey["300"]};

                        &:last-child {
                            border-bottom: 0;
                        }

                        &__link {
                            display: flex;
                            align-content: center;
                            justify-content: space-between;
                            text-decoration: none;
                            padding: 20px;

                            &:hover .repository__chevron {
                                color: ${colors.primary} !important;
                            }
                        }

                        &__meta {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                        }

                        &__name {
                            color: ${colors.primary};
                            font-weight: 600;
                            font-size: 1.7rem;
                            margin-bottom: 15px;
                        }

                        &__owner {
                            margin-right: 10px;
                            display: inline-block;
                        }

                        &__chevron {
                            color: ${colors.grey["200"]};
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                        }
                    }
                `}
            </style>
        </li>
    );
};

Repository.propTypes = {
    repository: PropTypes.object.isRequired,
};

export default Repository;
