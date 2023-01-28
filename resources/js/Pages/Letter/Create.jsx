import PageTitle from "@/Components/PageTitle";
import Explain from "@/Components/Explain";
import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";

const Create = ({ letter }) => {
    const { data, setData, post, errors, processing } = useForm({ letter: "" });
    const [valentine, setValentine] = useState(false);

    useEffect(() => {
        setValentine(true);
        setTimeout(() => {
            setValentine(false);
        }, 5000);
    }, []);

    return (
        <>
            <Head>
                <title>きゅーあーるせいせい</title>
            </Head>
            <Loading isLoading={processing || valentine} />

            <div className="text-center">
                <PageTitle></PageTitle>
                <div class="flex-row  mt-16 mx-10 sm:flex sm:justify-between sm:mx-20">
                    <Explain src="https://res.cloudinary.com/shoimages/image/upload/v1673764879/ar-choco/sample-letter_wveolg.jpg">
                        ①手紙をアップロード
                    </Explain>
                    <Explain src="https://res.cloudinary.com/shoimages/image/upload/v1673771440/ar-choco/PXL_20230115_082740684_qbtouj.jpg">
                        ②QRコードをチョコに貼り付け
                    </Explain>
                    <Explain src="https://res.cloudinary.com/shoimages/image/upload/v1673771480/ar-choco/PXL_20230115_082822164_ldsaxt.jpg">
                        ③スマホで手紙を表示
                    </Explain>
                </div>
                <a href="/create_letter">
                    <p className="text-blue-700 text-lg underline hover:font-bold mb-4">
                        手紙を作って送る
                    </p>
                </a>
                <a href="/handwrite_letter">
                    <p className="text-blue-700 text-lg underline hover:font-bold mb-4">
                        手書きの手紙を送る
                    </p>
                </a>
            </div>
        </>
    );
};

export default Create;
