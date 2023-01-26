import React, { useRef, useState, useEffect } from "react";
import { Link, Head, useForm } from "@inertiajs/inertia-react";
import styled from "styled-components";

const WhiteStyle = styled.div`
    background-color: white;
    width: 80%;
`;

const ReceiverStyle = styled.input`
    border-bottom: 1px solid #cccccc;
    border-right: none;
    border-left: none;
    border-top: none;
`;

const ReceiverWrapper = styled.div`
    margin-right: auto;
    margin-left: auto;
    width: 60%;
`;

const SenderStyle = styled.input`
    border-bottom: 1px solid #cccccc;
    border-right: none;
    border-left: none;
    border-top: none;
`;

const SenderWrapper = styled.div`
    margin-right: auto;
    margin-left: auto;
    width: 60%;
`;


const TextStyle = styled.textarea`
    line-height: 30px;
    background: linear-gradient(to bottom, #cccccc 1px, white 1px);
    background-size: 100% 30px;
    background-origin: content-box;
    background-attachment: local;
    /* 枠線を消す */
    border: none;
    /* 右下の//(サイズ変更機能)を消す */
    resize: none;
    /* フォーカスした際の青い枠線を消す */
    outline: none;
    width: 100%;
    height: 100%;
`;

const TextWrapper = styled.div`
    width: 85%;
    margin-top: 5vh;
    height: 55vh;
    margin-left: auto;
    margin-right: auto;
`;

export default React.forwardRef(function CreateLetter(props, ref) {
    const { data, setData, post, errors, processing } = useForm({
        receiver: "",
        body: "",
        sender: ""

    });

    function onSubmit(e) {
        //submit関数。
        e.preventDefault();
        post(route("images.store_create_letter"));
    }

    return (
        <div className="w-screen h-screen justify-center items-center flex flex-col">
            <h3 className="text-3xl">手紙を書こう</h3>
            <WhiteStyle ref={ref}>
                <form onSubmit={onSubmit}>
                    <ReceiverWrapper>
                        <ReceiverStyle
                            id="receiver"
                            type="text"
                            value={data.title}
                            placeholder="相手のお名前"
                            maxLength="15"
                            onChange={(e) => setData("receiver", e.target.value)}
                        />
                        {errors.receiver && (
                            <div className="text-red-600">{errors.receiver}</div>
                        )}
                    </ReceiverWrapper>
                    <TextWrapper>
                        <TextStyle
                            id="description"
                            value={data.body}
                            onChange={(e) => {
                                setData("body", e.target.value);
                            }}
                        ></TextStyle>
                        {errors.body && (
                            <div className="text-red-600">{errors.body}</div>
                        )}
                    </TextWrapper>
                    <SenderWrapper>
                        <SenderStyle
                            id="sender"
                            type="text"
                            value={data.title}
                            placeholder="あなたのお名前"
                            maxLength="15"
                            onChange={(e) => setData("sender", e.target.value)}
                        />
                        {errors.sender && (
                            <div className="text-red-600">{errors.sender}</div>
                        )}
                    </SenderWrapper>
                    <div className="flex justify-end pr-2">
                        <button
                            onClick={onSubmit}
                            disabled={processing}
                            className="postButton w-1/4 h-10 text-xs text-black font-bold rounded border border-black focus:outline-none focus:shadow-outline"
                        >
                            投稿
                        </button>
                    </div>
                </form>
            </WhiteStyle>
            <div className="flex">
                <a href="/">
                    <p className="text-blue-700 text-lg underline hover:font-bold mb-4 mr-4">
                        戻る
                    </p>
                </a>
                <a href="/handwrite_letter">
                    <p className="text-blue-700 text-lg underline hover:font-bold mb-4">
                        手書きの手紙を送る
                    </p>
                </a>
            </div>
        </div>
    );
});
