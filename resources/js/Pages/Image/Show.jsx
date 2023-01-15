import React from "react";

const Show = (props) => {
    const { image } = props;
    return (
        <div>
            <p>QRコードをクリックするとダウンロードされるよ</p>
            <a href={`/QR/${image.id}.svg`} download>
                <img src={`/QR/${image.id}.svg`} width="300" height="150" />
            </a>
            <p>下の画像をクリックするとダウンロードされるよ</p>
            <a href={`/pattern-ar.png`} download>
                <img src={`/pattern-ar.png`} width="300" height="150" />
            </a>
        </div>
    );
};

export default Show;
