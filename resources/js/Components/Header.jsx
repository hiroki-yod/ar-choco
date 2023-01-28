import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@inertiajs/inertia-react";

export default function Explain() {
    const [isOpenDrawer, setDrawerState] = useState(false);
    return (
        <>
            <div className="ar-choco-brown-back h-14 flex flex-end">
                <MenuIcon
                    fontSize="large"
                    className="ar-choco-green ml-auto mr-4 my-auto"
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
                        <Link className="text-white">
                            <GitHubIcon className="mr-4" />
                            Github
                        </Link>
                    </div>
                </div>
            </Drawer>
        </>
    );
}
