export default function Explain({ src, children, step }) {
    return (
        <div class="text-center w-full sm:w-1/4">
            <img
                src={`step${step}.png`}
                className="relative h-1/5 top-10 right-10"
            ></img>
            <img className="" src={src} alt="Explanation" />
            <p class="text-xl font-bold text-stone-600 mt-4">{children}</p>
        </div>
    );
}
