import React from "react";

const SkillCard = ({ name, icon }) => {
  const DynamicIcon = ({ iconData }) => {
    if (!iconData || !iconData.elements) {
      return null;
    }

    return (
      <svg
        viewBox={iconData.viewBox}
        className={iconData.className}
        {...iconData.svgProps}
      >
        {iconData.elements.map((el, index) => {
          const Element = el.type; // e.g., 'path', 'circle'
          return <Element key={index} {...el.props} />;
        })}
      </svg>
    );
  };
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
      <DynamicIcon iconData={icon} />
      <p className="font-semibold text-gray-700 mt-2">{name}</p>
    </div>
  );
};

export default SkillCard;
