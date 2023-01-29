import React from "react";

export default function Loading(props) {
    const { isLoading } = props;
    if (isLoading) {
        return null;
    }
    return (
        <div className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 justify-items-center items-center z-50 bg-black bg-opacity-70 open">
            <img src="/loading.gif" className="loading-choco w-1/4" />
        </div>
    );
}
