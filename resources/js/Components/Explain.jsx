export default function Explain({ src, children }) {
    return (
        <div class="text-center w-full sm:w-1/4 mt-4">
            <img src={src} alt="Explanation" />
            <p class="text-xl font-bold text-stone-600 mt-4">{children}</p>
        </div>
    );
}
