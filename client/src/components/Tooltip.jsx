import React from "react";

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

export default Tooltip;
