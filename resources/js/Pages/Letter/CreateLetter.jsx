import React, { useRef, useState, useEffect } from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import styled from "styled-components";
import SelectTemplate from "@/Components/SelectTemplate";
import Layout from "@/Layouts/Layout";
import ChocoButton from "@/Components/ChocoButton";

const TextStyle = styled.textarea`
    margin-top: 13%;
    margin-left: auto;
    margin-right: auto;
    line-height: 30px;
    background-color: transparent;
    width: 100%;
    height: 82%;
    /* 枠線を消す */
    border: none;
    /* 右下の//(サイズ変更機能)を消す */
    resize: none;
    /* フォーカスした際の青い枠線を消す */
    outline: none;
`;

const CreateLetter = React.forwardRef((props, ref) => {
    const { data, setData, post, errors, processing } = useForm({
        body: "",
        template: "images/letter_template/chocolate.png",
    });

    const [selectedTemplate, setSelectedTemplate] = useState(
        "images/letter_template/chocolate.png"
    );

    const [selected, setSelected] = useState(false);

    const onSubmit = (e) => {
        //submit関数。
        e.preventDefault();
        post(route("images.store_create_letter"));
    };

    const selectTemplate = (e) => {
        e.preventDefault();
        setSelected((prev) => !prev);
        setData("template", selectedTemplate);
    };

    const templates = [
        "images/letter_template/chocolate.png",
        "images/letter_template/blue_stripe.png",
        "images/letter_template/red_stripe.png",
        "images/letter_template/ribbon.png",
    ];
    const changeTemplate = (e) => {
        setSelectedTemplate(
            e.target.src.substring(
                e.target.src.indexOf("images/letter_template/")
            )
        );
    };

    return (
        <>
            {!selected ? (
                <SelectTemplate
                    selectedTemplate={selectedTemplate}
                    templates={templates}
                    changeTemplate={changeTemplate}
                    selectTemplate={selectTemplate}
                />
            ) : (
                <div className="w-screen h-screen sm:justify-center my-16 sm:my-2 items-center flex flex-col">
                    <p class="mb-6 text-3xl">メッセージカードの内容を入力</p>
                    <div
                        ref={ref}
                        className="w-7/12 h-5/12 bg-cover "
                        style={{
                            backgroundImage: `url(${selectedTemplate})`,
                            aspectRatio: 7 / 5,
                        }}
                    >
                        <TextStyle
                            id="description"
                            value={data.body}
                            onChange={(e) => {
                                setData("body", e.target.value);
                            }}
                            className={
                                selectedTemplate ===
                                "images/letter_template/chocolate.png"
                                    ? "text-white"
                                    : ""
                            }
                        ></TextStyle>
                        {errors.body && (
                            <div className="text-red-600">{errors.body}</div>
                        )}
                    </div>
                    <div className="flex justify-end pr-2">
                        <ChocoButton onClick={selectTemplate} type="back">
                            別のカードを選ぶ
                        </ChocoButton>
                        <ChocoButton onClick={onSubmit} disabled={processing}>
                            メッセージを送る
                        </ChocoButton>
                    </div>
                </div>
            )}
        </>
    );
});

CreateLetter.layout = (page) => <Layout children={page} />;

export default CreateLetter;
