import PageTitle from "@/Components/PageTitle";
import Marker from "@/Components/Marker";
import React from "react";
import { Head } from "@inertiajs/inertia-react";

const Show = (props) => {
    const { letter } = props;
    return (
        <div className="text-center">
            <Head>
                <title>きゅーあーるせいせい</title>
            </Head>
            <PageTitle></PageTitle>
            <a href={"http://line.me/R/msg/text/?" + location.href }>LINEに送る</a>
            <div className="sm:flex sm:justify-center text-center">
                <Marker
                    href={`/QR/${letter.id}.svg`}
                    src={`/QR/${letter.id}.svg`}
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
