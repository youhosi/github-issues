import React, { useState, useCallback } from "react";
import { TriangleDownIcon, CheckIcon } from "@primer/octicons-react";

import { colors } from "theme/theme";

const sort = [
    { label: "Name", value: "NAME" },
    { label: "Stars", value: "STARGAZERS" },
    { label: "Last updated", value: "UPDATED_AT" },
];

const RepositoryOrder = ({ refetch }) => {
    const [currentOrder, setOrder] = useState(sort[0].value);

    const handleClick = useCallback(
        (value) => {
            const variables = { orderBy: { field: value, direction: "ASC" } };

            refetch({ variables: { orderBy: { direction: "ASC" } } }, { fetchPolicy: "network-only" });

            setOrder(value);
        },
        [refetch]
    );

    return (
        <details className="order">
            <summary className="meta">
                <TriangleDownIcon size={18} />

                <span className="meta__title">Sort by</span>
            </summary>

            <ul className="order__list list">
                {sort.map(({ label, value }) => (
                    <li key={value} className={`list__item item ${currentOrder === value ? "item--active" : ""}`}>
                        <i>
                            <CheckIcon size={16} />
                        </i>

                        <button type="button" className="item__button" onClick={() => handleClick(value)}>
                            {label}
                        </button>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                .order {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    width: 160px;

                    &,
                    &__list {
                        background-color: ${colors.white};
                        border: 1px solid ${colors.grey["300"]};
                        border-radius: 6px;
                    }

                    &__list {
                        position: absolute;
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        top: 38px;
                        right: 0;
                        left: 0;
                        margin: 8px 0 0;
                        z-index: 1;
                    }
                }

                .meta {
                    color: ${colors.grey["100"]};
                    display: flex;
                    align-items: center;
                    font-weight: 500;
                    list-style: none;
                    padding: 10px;
                    cursor: pointer;

                    &__title {
                        margin-left: 5px;
                    }
                }

                .list {
                    list-style: none;
                    padding: 5px 0;

                    &__item {
                        list-style-type: none;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                    }
                }

                .item {
                    position: relative;

                    &--active i {
                        display: initial !important;
                    }

                    &__button {
                        background-color: transparent;
                        cursor: pointer;
                        width: 100%;
                        margin: 0;
                        padding: 5px 10px 5px calc(20px + 16px);
                        text-align: left;
                        border: 0;
                    }

                    i {
                        transform: translateY(-50%);
                        display: none;
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        pointer-events: none;
                    }
                }
            `}</style>
        </details>
    );
};

export default RepositoryOrder;
