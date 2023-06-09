import React from "react";

const Pagination = ({ totalPages, click, active }) => {
    const list = new Array(totalPages).fill(0);
    return (
        <div className="flex items-center justify-center p-4 gap-x-4">
            {list.length > 1 &&
                list.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => click(index + 1)}
                        className={`w-[30px] h-[30px] rounded-full  flex items-center justify-center text-white cursor-pointer select-none ${
                            index + 1 === active
                                ? "bg-gradient-to-br from-blue-600 to-cyan-600"
                                : "bg-gradient-to-br from-slate-900 to-slate-700"
                        }`}>
                        {index + 1}
                    </div>
                ))}
        </div>
    );
};

export default Pagination;
