import PageTitle from "@/Components/PageTitle";
import Explain from "@/Components/Explain";
import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/inertia-react";
import React, { useState } from "react";

const Create = ({ image }) => {
    const { data, setData, post, errors } = useForm({ image: "" });

    const handleSendImage = (e) => {
        e.preventDefault();
        post(route("images.store"));
    };
    const [preImage, setPreImage] = useState("");

    return (
        <>
            <div>
                {image.map((i) => (
                    <a href={`/valentine/${i.id}`}>{i.id}</a>
                ))}
            </div>
            <div className="text-center">
                <PageTitle></PageTitle>
                <div class="flex justify-between mt-16 mx-20">
                    <Explain src="storage/images/sample.jpg">
                        ①手紙をアップロード
                    </Explain>
                    <Explain src="storage/images/sample.jpg">
                        ②QRコードをダウンロード
                    </Explain>
                    <Explain src="storage/images/sample.jpg">
                        ③スマホで手紙を表示
                    </Explain>
                </div>
                <form onSubmit={handleSendImage}>
                    {/* <InputFile
                        onChange={(e) => setData("image", e.target.files)}
                    ></InputFile> */}
                    <div className="mt-6">
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
                                        reader.readAsDataURL(e.target.files[0]);
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
                            <div className="text-red-600">{errors.images}</div>
                        )}
                    </div>
                    <p className="text-red-600">{errors.image}</p>
                    <Button>Upload</Button>
                </form>
            </div>
        </>
    );
};

export default Create;
