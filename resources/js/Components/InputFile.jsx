export default function InputFile({onChange}) {
    return (
        <input
            className="block w-1/2 text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none mx-auto mt-12"
            type="file"
            accept="image/*"
            encType="multipart/form-data"
            onChange={onChange}
        />
    );
}