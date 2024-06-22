import React from "react";
// import { useState } from "react";
const Tooltip = ({ tooltip, pos,className, children }) => {
  return (
    <div className={`${className} group relative flex`}>
      {children}
      <span className={`${tooltip!=''?"group-hover:scale-100":""}  absolute ${pos} scale-0 transition-all rounded bg-brand-third p-2 text-xs text-brand-primary `}>
        {tooltip}
      </span>
    </div>
  );
};
// const Tooltip = ({ tooltip,pos,className,children }) => {
//   const [visible, setVisible] = useState(false);

//   const showTooltip = () => setVisible(true);
//   const hideTooltip = () => setVisible(false);

//   return (
//     <div className="relative">
//       <div 
//         className={`z-10 ${className} `}
//         onMouseEnter={showTooltip}
//         onMouseLeave={hideTooltip}
//       >
//         {children}
//       </div>
//       {visible && (
//         <div className={`absolute top-1/2 -right-1/2  mb-2 w-max px-2 py-1 bg-brand-third text-brand-primary text-sm rounded-md shadow-lg`}>
//           {tooltip}
//         </div>
//       )}
//     </div>
//   );
// };
export default Tooltip;
