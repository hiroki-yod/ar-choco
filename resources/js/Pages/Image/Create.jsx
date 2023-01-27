import PageTitle from "@/Components/PageTitle";
import Explain from "@/Components/Explain";
import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";

const Create = ({ image }) => {
    const { data, setData, post, errors, processing } = useForm({ image: "" });

    const handleSendImage = (e) => {
        e.preventDefault();
        post(route("letters.store"));
    };
    const [preImage, setPreImage] = useState("");
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
                <form onSubmit={handleSendImage}>
                    {/* <InputFile
                        onChange={(e) => setData("image", e.target.files)}
                    ></InputFile> */}
                    <div className="sm:flex sm:justify-center mb-4 md:items-center">
                        <div className="mt-6 mx-6">
                            {!preImage ? (
                                <label className="mx-auto flex items-center justify-center h-20 w-40 bg-white border rounded border-black">
                                    <input
                                        type="file"
                                        name="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            setData("image", e.target.files);
                                            const reader = new FileReader();
                                            reader.onload = (e) => {
                                                setPreImage(e.target.result);
                                            };
                                            reader.readAsDataURL(
                                                e.target.files[0]
                                            );
                                        }}
                                    />
                                    画像を選択する
                                </label>
                            ) : (
                                <div className="mx-auto flex items-center justify-center h-40 w-80 bg-white border rounded border-black mb-4 relative">
                                    <svg
                                        onClick={() => {
                                            setPreImage(null);
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="absolute left-full bottom-full w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <img className="h-40" src={preImage} />
                                </div>
                            )}
                            {errors.images && (
                                <div className="text-red-600">
                                    {errors.images}
                                </div>
                            )}
                        </div>
                        <p className="text-red-600">{errors.image}</p>
                        <Button>Upload</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;
