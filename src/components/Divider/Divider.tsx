import React from "react";

interface DividerProps {
    className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
    return (
        <hr className={`border-t border-cardBorder !my-2 !mb-2 ${className}`} />
    );
};

export default Divider;
