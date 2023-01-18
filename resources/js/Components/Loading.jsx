import React from "react";

export default function Loading(props) {
    const { isLoading } = props;
    if (!isLoading) {
        return null;
    }
    return (
        <div className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 justify-items-center items-center z-50 bg-black bg-opacity-70 open">
            <ul className="valentine open">
                <li>V</li>
                <li>a</li>
                <li>l</li>
                <li>e</li>
                <li>n</li>
                <li>t</li>
                <li>i</li>
                <li>n</li>
                <li>e</li>
            </ul>
            <ul className="happy open">
                <li>H</li>
                <li>a</li>
                <li>p</li>
                <li>p</li>
                <li>p</li>
                <li>y</li>
            </ul>
        </div>
    );
}
