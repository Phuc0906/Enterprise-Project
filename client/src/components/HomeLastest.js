import React from "react";
import LatestCard from "./LatestCard";

const HomeLastest = () => {
    return (
        <div className="flex flex-col p-4 mt-4 max-w-[1300px] mx-auto">
            <h2 className="flex-shrink-0 text-2xl font-bold text-center">
                The Latest
            </h2>
            <div className="flex flex-col md:flex-row items-center max-h-full mt-5 gap-x-3">
                <LatestCard
                    imageUrl="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1824,c_limit/20065824-35a0-4579-940d-b67aa35b0c8d/nike-just-do-it.jpg"
                    label="JA 1 'DAY ONE'"
                    desc="For those with a tireless work ethic from day one."
                    button="Read more"></LatestCard>
                <LatestCard
                    imageUrl="https://i.pinimg.com/564x/6a/fb/44/6afb441dad31a5654ac363ea6b4841ec.jpg"
                    label="WIN THE TU LAN AMAZING TOUR!"
                    desc="Join the contest on the adidas App. T&C's apply."
                    button="Join now"></LatestCard>
            </div>
        </div>

    );
};

export default HomeLastest;
// <div className="flex flex-col p-4 mt-4 max-w-[1300px] mx-auto">
//     <h2 className="flex-shrink-0 text-2xl font-bold text-center">
//         The Latest
//     </h2>
//     <div className="flex items-center max-h-full mt-5 gap-x-3">
//         <LatestCard
//             imageUrl="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1824,c_limit/20065824-35a0-4579-940d-b67aa35b0c8d/nike-just-do-it.jpg"
//             label="JA 1 'DAY ONE'"
//             desc="For those with a tireless work ethic from day one."
//             button="Read more"></LatestCard>
//         <LatestCard
//             imageUrl="https://i.pinimg.com/564x/6a/fb/44/6afb441dad31a5654ac363ea6b4841ec.jpg"
//             label="WIN THE TU LAN AMAZING TOUR!"
//             desc="Join the contest on the adidas App. T&C's apply."
//             button="Join now"></LatestCard>
//     </div>
// </div>