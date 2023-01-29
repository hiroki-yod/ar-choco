import { useEffect, useState } from "react";

export default function ToTop() {
    const [show, setShow] = useState(false);

    const ChangeShow = () => {
        if (window.pageYOffset > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const onScrollTop = () => {
        window.scroll({ top: 0, behavior: "smooth" });
        console.log("test");
    };

    useEffect(() => {
        window.addEventListener("scroll", ChangeShow);
        return () => window.removeEventListener("scroll", ChangeShow);
    }, []);

    if (show)
        return (
            <div
                className="fixed bottom-10 right-10 z-10 w-14 h-14 rounded-full text-white ar-choco-brown-back items-center justify-center"
                onClick={onScrollTop}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-14 h-14 top-28 left-28"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                </svg>
            </div>
        );
    else return null;
}
