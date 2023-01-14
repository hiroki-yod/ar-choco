import { useForm } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {
    const { data, setData, post } = useForm({ image: "" });

    const handleSendImage = (e) => {
        e.preventDefault();
        post(route("images.store"));
    };

    return (
        <div>
            <form onSubmit={handleSendImage}>
                <input
                    type="file"
                    encType="multipart/form-data"
                    onChange={(e) => setData("image", e.target.files)}
                />
                <button className="px-5 py-2 text-white bg-red-500 border-b-4 border-red-700 font-bold hover:bg-opacity-90 hover:border-opacity-90 active:border-opacity-10 active:scale-95 rounded shadow-md">
                    button
                </button>
            </form>
        </div>
    );
};

export default Create;
