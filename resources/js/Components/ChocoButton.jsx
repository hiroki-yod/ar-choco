import { Link } from "@inertiajs/inertia-react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function ChocoButton({
    href,
    children,
    type,
    onClick,
    disabled,
}) {
    const goButton = (
        <p>
            {children}
            <PlayArrowIcon className="ar-choco-green" fontSize="large" />
        </p>
    );

    const backButton = (
        <p>
            <PlayArrowIcon
                className="ar-choco-green transform rotate-180"
                fontSize="large"
            />
            {children}
        </p>
    );

    const button = (
        <button className="btn fourth" disabled={disabled}>
            {type === "back" ? backButton : goButton}
        </button>
    );

    return href ? (
        <Link href={href}>{button}</Link>
    ) : (
        <button className="btn fourth" onClick={onClick} disabled={disabled}>
            {type === "back" ? backButton : goButton}
        </button>
    );
}
