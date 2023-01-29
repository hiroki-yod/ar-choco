import React, { useEffect, useState, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import Explain from "@/Components/Explain";
import ChocoButton from "@/Components/ChocoButton";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Create = ({ letter }) => {
    const { data, setData, post, errors, processing } = useForm({ letter: "" });
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = React.useRef();
    const handleClick = () => inputRef.current.click();

    async function handleSendImage(e) {
        e.preventDefault();
        //入力された住所の緯度経度を取得
        Inertia.post(route("letters.store"), {
            letter: e.target[0].files,
        });
    }

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
                <Explain step={2} src="/images/explain/step2.png">
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
                <Explain step={1} src="/images/explain/step1.png">
                    ①カードのデザインを選び、送りたいメッセージを入力
                </Explain>
                <Explain step={2} src="/images/explain/step2.png">
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
                <title>AR Letter</title>
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

                <div className="flex justify-center items-center flex-col sm:flex-row">
                    <ChocoButton href="/create_letter">
                        手紙を作って送る
                    </ChocoButton>
                    <ChocoButton onClick={handleClick}>
                        手書きの手紙を送る
                    </ChocoButton>
                    <form onSubmit={handleSendImage}>
                        <input
                            type="file"
                            name="file"
                            ref={inputRef}
                            style={{ display: "none" }}
                            onChange={() => {
                                inputRef.current.form.submitButton.click();
                            }}
                        />
                        <button
                            type="submit"
                            id="submitButton"
                            style={{ display: "none" }}
                        ></button>
                    </form>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => <Layout children={page} />;

export default Create;
