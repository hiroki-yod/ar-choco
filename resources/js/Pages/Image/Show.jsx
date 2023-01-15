import PageTitle from "@/Components/PageTitle";
import Letter from "@/Components/Letter";
import Marker from "@/Components/Marker";
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

            <PageTitle></PageTitle>
            <div className="flex justify-between mt-12 mx-20">
                <Letter src={`/QR/${image.id}.svg`}>
                    あなたがアップロードした手紙です
                </Letter>
                <Marker src={`/pattern-ar.png`}>
                    こちらのマーカーを貼り付けてください
                </Marker>
            </div>
        </div>
    );
};

export default Show;
