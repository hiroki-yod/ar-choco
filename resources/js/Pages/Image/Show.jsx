import PageTitle from "@/Components/PageTitle";
import Marker from "@/Components/Marker";
import React from "react";
import { Head } from "@inertiajs/inertia-react";

const Show = (props) => {
    const { image } = props;
    return (
        <div className="text-center">
            <Head>
                <title>きゅーあーるせいせい</title>
            </Head>
            <PageTitle></PageTitle>
            <div className="sm:flex sm:justify-center text-center">
                <Marker
                    href={`/QR/${image.id}.svg`}
                    src={`/QR/${image.id}.svg`}
                >
                    QRコードはこちら
                </Marker>
                <Marker href={`/pattern-ar.png`} src={`/pattern-ar.png`}>
                    ARマーカーはこちら
                </Marker>
            </div>
            <a href="/">
                <p className="text-blue-700 text-lg underline hover:font-bold mb-4">
                    TOPページに戻る
                </p>
            </a>
        </div>
    );
};

export default Show;
