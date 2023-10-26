import React, { useContext } from "react";
import CalendarContext from "../context/CalendarContext";

export const Labels = () => {
  const { labels, updateLabel } = useContext(CalendarContext);
  return (
    <React.Fragment>
      <p className="text-gray-800 font-bold mt-10">Eventos</p>
      {labels.map(({ label: lbl, checked }, index) => (
        <div key={index} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({label: lbl, checked: !checked})}
            className={`form-checkbox h-5 w-5 text-${lbl}-500 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </div>
      ))}
    </React.Fragment>
  );
};
