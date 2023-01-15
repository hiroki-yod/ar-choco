import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/inertia-react";

const Error = (props) => {
    const { status } = props;
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    };

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    };

    return (
        <div className="text-center">
            <div className="flex flex-col items-center my-10">
                <div className="text-6xl mb-4 font-bold text-amber-900">
                    {title[status]}
                </div>
                <div className="text-2xl font-bold">{description[status]}</div>
                <Link
                    href={"/"}
                    className="py-10 font-bold underline hover:no-underline hover:scale-110 duration-200"
                >
                    ←作成ページに戻る
                </Link>
            </div>
        </div>
    );
};

export default Error;
