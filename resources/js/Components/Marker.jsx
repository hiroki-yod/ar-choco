import html2canvas from "html2canvas";

export default function Marker({ href, src, children }) {
    const saveAsImage = (uri) => {
        const downloadLink = document.createElement("a");

        if (typeof downloadLink.download === "string") {
            downloadLink.href = uri;

            // ファイル名
            downloadLink.download = "component.png";

            // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
            document.body.appendChild(downloadLink);

            // ダウンロードリンクが設定された a タグをクリック
            downloadLink.click();

            // Firefox 対策で追加したリンクを削除しておく
            document.body.removeChild(downloadLink);
        } else {
            window.open(uri);
        }
    };

    const onClickExport = () => {
        // 画像に変換する component の id を指定
        const target = document.getElementById(src);
        html2canvas(target).then((canvas) => {
            const targetImgUri = canvas.toDataURL("img/png");
            saveAsImage(targetImgUri);
        });
    };
    return (
        <div class="text-center w-1/3 sm:mx-16 mx-auto my-16">
            <div onClick={() => onClickExport()} id={src}>
                <img src={src} width="300" height="150" className="mx-auto" />
            </div>
            <p className="mt-4 text-xl font-bold text-stone-600">{children}</p>
        </div>
    );
}
