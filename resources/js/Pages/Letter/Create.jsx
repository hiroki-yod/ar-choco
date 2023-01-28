import React, { useEffect, useState } from "react";
import PageTitle from "@/Components/PageTitle";
import Header from "@/Components/Header";
import Explain from "@/Components/Explain";
import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import { Head, Link } from "@inertiajs/inertia-react";
import Drawer from "@mui/material/Drawer";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Create = ({ letter }) => {
    const { data, setData, post, errors, processing } = useForm({ letter: "" });
    const [valentine, setValentine] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setValentine(true);
        setTimeout(() => {
            setValentine(false);
        }, 5000);
    }, []);

    const useageClose = (
        <div class="text-start">
            <button
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <PlayArrowIcon className="ar-choco-green" fontSize="large" />
                使い方
            </button>
        </div>
    );
    const useageOpen = (
        <div class="text-start">
            <button
                onClick={() => {
                    setIsOpen(false);
                }}
            >
                <PlayArrowIcon
                    className="ar-choco-green transform rotate-90"
                    fontSize="large"
                />
                使い方
            </button>
            <div class="flex-row mx-10 sm:flex sm:justify-between sm:mx-14">
                <Explain
                    step={1}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673764879/ar-choco/sample-letter_wveolg.jpg"
                >
                    ①手紙をアップロード
                </Explain>
                <Explain
                    step={2}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771440/ar-choco/PXL_20230115_082740684_qbtouj.jpg"
                >
                    ②QRコードをチョコに貼り付け
                </Explain>
                <Explain
                    step={3}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771480/ar-choco/PXL_20230115_082822164_ldsaxt.jpg"
                >
                    ③スマホで手紙を表示
                </Explain>
            </div>
        </div>
    );

    return (
        <>
            <Head>
                <title>きゅーあーるせいせい</title>
            </Head>

            <div className="text-center">
                <Header></Header>
                <div>
                    <div className="my-8 mx-auto w-3/4">
                        <p className="ar-choco-pink text-4xl title-border py-8 px-8 mb-8">
                            会えないあの人にチョコを贈ろう
                        </p>
                        {isOpen ? useageOpen : useageClose}
                    </div>
                </div>

                <div className="flex justify-center">
                    <Link href="/create_letter">
                        <button className="btn fourth">
                            手書きの手紙を送る
                        </button>
                    </Link>
                    <Link href="/handwrite_letter">
                        <button className="btn fourth">手紙を作って送る</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Create;
