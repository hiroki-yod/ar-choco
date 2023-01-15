import PageTitle from '@/Components/PageTitle';
import Letter from '@/Components/Letter';
import Marker from '@/Components/Marker';
import React from "react";

const Show = (props) => {
    const { image } = props;
    return (
        <div>
            <PageTitle></PageTitle>
            <div className="flex justify-between mt-12 mx-20">
                <Letter src={image.image_url}>
                    あなたがアップロードした手紙です
                </Letter>
                <Marker src={image.image_url}>
                    こちらのマーカーを貼り付けてください
                </Marker>
            </div>
        </div>
    );
};

export default Show;
