import React from "react";

const Show = (props) => {
    const { image } = props;
    return (
        <div>
            <img src={image.image_url} />
        </div>
    );
};

export default Show;
