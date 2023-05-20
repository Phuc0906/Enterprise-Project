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
                        className={`w-[30px] h-[30px] rounded-full bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center text-white cursor-pointer select-none ${
                            index + 1 === active
                                ? "bg-gradient-to-br from-cyan-700 to-green-600"
                                : ""
                        }`}>
                        {index + 1}
                    </div>
                ))}
        </div>
    );
};

export default Pagination;
