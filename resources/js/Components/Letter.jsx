export default function Letter({ src, children }) {
    return (
        <div class="text-center w-1/2">
            <img src={src} alt="Explanation" />
            <p class="text-xl font-bold text-stone-600 mt-4">{children}</p>
        </div>
    );
}