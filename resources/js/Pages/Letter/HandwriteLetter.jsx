// import PageTitle from "@/Components/PageTitle";
// import Explain from "@/Components/Explain";
// import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";
import Loading from "@/Components/Loading";
import { useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/inertia-react";

const HandwriteLetter = ({ letter }) => {
    const { data, setData, post, errors, processing } = useForm({ letter: "" });

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
            <div className="mx-auto flex flex-col items-center justify-center w-screen h-screen">
                <form onSubmit={handleSendImage}>
                    <div className="sm:flex sm:justify-center mb-4 md:items-center">
                        <div className="mt-6 mx-6">
                            {!preImage ? (
                                <label className="mx-auto flex items-center justify-center h-20 w-40 bg-white border rounded border-black">
                                    <input
                                        type="file"
                                        name="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            setData("letter", e.target.files);
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
                            {errors.letters && (
                                <div className="text-red-600">
                                    {errors.letters}
                                </div>
                            )}
                        </div>
                        <p className="text-red-600">{errors.letter}</p>
                        <Button>Upload</Button>
                    </div>
                </form>
                <div className="flex">
                    <a href="/">
                        <p className="text-blue-700 text-lg underline hover:font-bold mb-4 mr-4">
                            戻る
                        </p>
                    </a>
                    <a href="/create_letter">
                        <p className="text-blue-700 text-lg underline hover:font-bold mb-4">
                            手紙を作って送る
                        </p>
                    </a>
                </div>
            </div>
        </>
    );
};

export default HandwriteLetter;
