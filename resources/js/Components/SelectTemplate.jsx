const SelectTemplate = ({
    selectedTemplate,
    templates,
    changeTemplate,
    selectTemplate,
}) => {
    return (
        <>
            <div className="w-full h-full justify-center items-center flex flex-col">
                <p class="mt-12 mb-6 text-3xl">メッセージカードのデザインを選ぶ</p>
                <div className="flex flex-wrap px-4 sm:px-28">
                    {templates.map((template) => {
                        return (
                            <div
                                key={template}
                                className="w-1/2 sm:w-1/3 p-3"
                                onClick={selectTemplate}
                            >
                                <div>
                                    <img
                                        src={template}
                                        onClick={changeTemplate}
                                        className="select-image"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default SelectTemplate;
