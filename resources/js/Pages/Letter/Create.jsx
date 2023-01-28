import React, { useEffect, useState } from "react";
import PageTitle from "@/Components/PageTitle";
import Header from "@/Components/Header";
import Explain from "@/Components/Explain";
import InputFile from "@/Components/InputFile";
import ChocoButton from "@/Components/ChocoButton";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";

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
            <p className="mt-2">手書きの手紙を送る場合</p>
            <div class="flex-row mx-10 sm:flex sm:justify-between sm:mx-14">
                <Explain
                    step={1}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673764879/ar-choco/sample-letter_wveolg.jpg"
                >
                    ①メッセージを書いて写真に撮り、ボタンからアップロード
                </Explain>
                <Explain
                    step={2}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771440/ar-choco/PXL_20230115_082740684_qbtouj.jpg"
                >
                    ②LINEであの人にURLを送る
                </Explain>
                <Explain
                    step={3}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771480/ar-choco/PXL_20230115_082822164_ldsaxt.jpg"
                >
                    ③会えないあの人にURLを開いてもらう
                </Explain>
            </div>
            <p className="mt-2">手紙を1から作成する場合</p>
            <div class="flex-row mx-10 sm:flex sm:justify-between sm:mx-14">
                <Explain
                    step={1}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673764879/ar-choco/sample-letter_wveolg.jpg"
                >
                    ①カードのデザインを選び、送りたいメッセージを入力
                </Explain>
                <Explain
                    step={2}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771440/ar-choco/PXL_20230115_082740684_qbtouj.jpg"
                >
                    ②LINEであの人にURLを送る
                </Explain>
                <Explain
                    step={3}
                    src="https://res.cloudinary.com/shoimages/image/upload/v1673771480/ar-choco/PXL_20230115_082822164_ldsaxt.jpg"
                >
                    ③会えないあの人にURLを開いてもらう
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
                <div>
                    <div className="my-8 mx-auto w-3/4">
                        <p className="ar-choco-pink text-4xl title-border py-8 px-8 mb-8">
                            会えないあの人にチョコを贈ろう
                        </p>
                        {isOpen ? useageOpen : useageClose}
                    </div>
                </div>

                <div className="flex justify-center">
                    <ChocoButton href="/create_letter">
                        手書きの手紙を送る
                    </ChocoButton>
                    <ChocoButton href="/handwrite_letter">
                        手紙を作って送る
                    </ChocoButton>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => <Layout children={page} />;

export default Create;
