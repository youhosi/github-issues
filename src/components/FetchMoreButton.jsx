import React from "react";
import PropTypes from "prop-types";

import { colors } from "theme/theme";

const FetchMoreButton = ({ onClick, isLoading }) => (
    <button type="button" className="loadmore" onClick={isLoading ? null : onClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load more"}

        <style jsx>
            {`
                .loadmore {
                    color: ${colors.white};
                    background-color: ${colors.primary};
                    box-shadow: 0 0 10px -5px ${colors.primary};
                    padding: 10px 20px;
                    font-weight: 500;
                    font-size: 1.5rem;
                    border-radius: 6px;
                    border: 0;
                    transition: box-shadow 0.2s ease;
                    cursor: pointer;

                    &:hover {
                        box-shadow: 0 0 10px -3px ${colors.primary};
                    }
                }
            `}
        </style>
    </button>
);

FetchMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default FetchMoreButton;
