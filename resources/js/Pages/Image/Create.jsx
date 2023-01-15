import PageTitle from '@/Components/PageTitle';
import Explain from '@/Components/Explain';
import InputFile from '@/Components/InputFile';
import Button from '@/Components/Button';
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {
    const { data, setData, post, errors } = useForm({ image: "" });

    const handleSendImage = (e) => {
        e.preventDefault();
        post(route("images.store"));
    };

    return (
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
                <InputFile onChange={(e) => setData("image", e.target.files)}>
                </InputFile>
                <p className="text-red-600">{errors.image}</p>
                <Button></Button>
            </form>
        </div>
    );
};

export default Create;
