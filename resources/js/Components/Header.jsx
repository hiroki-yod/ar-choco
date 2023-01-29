import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import UndoIcon from "@mui/icons-material/Undo";
import { Link } from "@inertiajs/inertia-react";

export default function Explain() {
    const [isOpenDrawer, setDrawerState] = useState(false);
    return (
        <>
            <div className="ar-choco-brown-back h-16 flex">
                <Link href="/">
                    <img
                        src="/logo.png"
                        className="h-12 sm:h-16 my-auto ml-2 z-10 absolute top-2 sm:static"
                    ></img>
                </Link>

                <Link href="/">
                    <img
                        src="/title-logo.png"
                        className="h-12 sm:h-16 ml-2 absolute left-16 top-2 z-10 sm:static"
                    ></img>
                </Link>
                <img
                    src="/melt_chocolate.png"
                    className="absolute h-24 ml-auto right-10 sm:right-24 z-0"
                    // style={{ height: "100px", width: "290px" }}
                ></img>
                <MenuIcon
                    fontSize="large"
                    className="ar-choco-green ml-auto mr-4 my-auto absolute right-4 top-4 z-10"
                    onClick={() => {
                        setDrawerState(true);
                    }}
                />
            </div>
            <Drawer
                anchor="right"
                open={isOpenDrawer}
                onClose={() => {
                    setDrawerState(false);
                }}
            >
                <div className="h-full px-10 ar-choco-brown-back">
                    <div className="mt-20 px-4 pb-2 border-b-2">
                        <Link className="text-white">
                            <HelpOutlineIcon className="mr-4" />
                            使い方
                        </Link>
                    </div>

                    <div className="mt-10 px-4 pb-2 border-b-2">
                        <Link className="text-white">
                            <MailOutlineIcon className="mr-4" />
                            お問い合わせ
                        </Link>
                    </div>
                    <div className="mt-10 px-4 pb-2 border-b-2">
                        <a
                            href="https://github.com/hiroki-yod/ar-choco"
                            className="text-white"
                        >
                            <GitHubIcon className="mr-4" />
                            Github
                        </a>
                    </div>
                    <div className="mt-10 px-4 pb-2 border-b-2">
                        <Link
                            href="/"
                            className="text-white"
                            onClick={() => setDrawerState(false)}
                        >
                            <UndoIcon className="mr-4" />
                            Topへ戻る
                        </Link>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
