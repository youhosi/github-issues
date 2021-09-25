import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Suspense = ({ children, fallback }) => {
    const [isServer, setServer] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setServer(false);
        }
    }, []);

    if (isServer) return children;

    return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
};

Suspense.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Suspense.defaultProps = { fallback: null };

export default Suspense;
