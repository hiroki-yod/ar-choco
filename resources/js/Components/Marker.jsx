export default function Marker({ href, src, children }) {
    return (
        <div class="text-center w-1/3 sm:mx-16 mx-auto my-16">
            <a href={href} download>
                <img src={src} width="300" height="150"  className="mx-auto"/>
            </a>
            <p className='mt-4 text-xl font-bold text-stone-600'>{ children }</p>
        </div>
    );
}