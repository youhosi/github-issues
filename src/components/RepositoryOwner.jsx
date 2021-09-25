import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import { graphql, useFragment } from "lib/relay";

const RepositoryOwner = ({ owner }) => {
    const data = useFragment(
        graphql`
            fragment RepositoryOwner on Repository {
                owner {
                    avatarUrl
                    login
                }
            }
        `,
        owner
    );

    const { login, avatarUrl } = data?.owner;

    return (
        <div className="owner">
            <figure className="owner__wrapper">
                <Image src={avatarUrl} alt={login} title={login} layout="fill" />
            </figure>

            <style jsx>{`
                .owner {
                    &__wrapper {
                        padding: 0;
                        margin: 0;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        overflow: hidden;
                        position: relative;
                    }
                }
            `}</style>
        </div>
    );
};

RepositoryOwner.propTypes = {
    owner: PropTypes.object.isRequired,
};

export default RepositoryOwner;
