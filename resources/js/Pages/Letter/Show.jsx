import CoppyBox from "@/Components/CoppyBox";
import DownloadButton from "@/Components/DownloadButton";
import Marker from "@/Components/Marker";
import React from "react";
import { Head } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import ChocoButton from "@/Components/ChocoButton";

const Show = (props) => {
    const { letter } = props;
    const message =
        "チョコが届きました！\n下記urlでカメラを起動してmeijiの板チョコかARマーカーにかざしてみてね!\n" +
        location.href;
    return (
        <div className="text-center flex flex-col justify-center">
            <Head>
                <title>きゅーあーるせいせい</title>
            </Head>
            <div className="my-8 mx-auto w-3/4 mt-20 mb-1">
                <a
                    href={"http://line.me/R/msg/text/?" + message}
                    className="text-4xl py-8 px-8 title-border-red "
                >
                    LINEであの人に送る
                    <img
                        className="inline-block ml-3 mb-2"
                        src="/LINE_Brand_icon.png"
                        width="50"
                        height="50"
                    ></img>
                </a>
            </div>
            <p className="mx-auto w-3/4 mt-20 mb-5">
                LINE以外のツールで送る人は、以下のメッセージと画像を一緒に送ってね
            </p>
            <CoppyBox>{message}</CoppyBox>
            <div className="sm:flex sm:justify-center text-center">
                <Marker
                    href={`/QR/${letter.id}.svg`}
                    src={`/QR/${letter.id}.svg`}
                >
                    QRコードはこちら
                    <DownloadButton href={`/QR/${letter.id}.svg`} />
                </Marker>
                <Marker href={`/pattern-ar.png`} src={`/pattern-ar.png`}>
                    ARマーカーはこちら
                    <DownloadButton href={`/pattern-ar.png`} />
                </Marker>
            </div>
<div className="flex justify-center text-center">

            <ChocoButton href="/" className="my-8 mx-auto w-3/4 mt-20 mb-20">
                TOPページに戻る
            </ChocoButton>
        </div>
</div>
    );
};

Show.layout = (page) => <Layout children={page} />;

export default Show;
