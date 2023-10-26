import React, { useContext, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineDrag,
  AiOutlineFileText,
  AiOutlineOrderedList,
} from "react-icons/ai";
import CalendarContext from "../context/CalendarContext";

const labelClass = ["red", "green", "blue"];

export const EventModal = () => {
  const { setShowEventModal, daySelected, dispatchCallEvent, selectedEvent } =
    useContext(CalendarContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelClass.find((lbl) => lbl === selectedEvent.label)
      : labelClass[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCallEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCallEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  };

  return (
    <div className="w-full h-screen fixed let-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl shadow-black w-1/4 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <AiOutlineDrag className="h-6 w-6" />
          <div className="flex gap-x-2">
            {selectedEvent && (
              <AiOutlineDelete
                className="h-6 w-6 cursor-pointer hover:bg-slate-300 rounded"
                onClick={() => {
                  dispatchCallEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <AiOutlineClose className="h-6 w-6 cursor-pointer hover:bg-slate-300 rounded" />
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-1/2 items-end gap-y-7">
            <input
              type="text"
              name="title"
              placeholder="Añadir Titulo"
              value={title}
              required
              className="pt-3 border-0 text-gray-950 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-x-2">
              <AiOutlineClockCircle />
              <p>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <div className="flex items-center gap-x-2">
              <AiOutlineFileText />
              <textarea
                type="text"
                name="description"
                placeholder="Añadir Descripción"
                value={description}
                required
                className="pt-3 border-0 text-gray-950 text-sm pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <AiOutlineOrderedList />
              <div className="flex gap-x-2">
                {labelClass.map((labelClass, index) => {
                  return (
                    <span
                      onClick={() => setSelectedLabel(labelClass)}
                      className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                      key={index}
                    >
                      {selectedLabel === labelClass && <AiOutlineCheck />}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t p-3 mt-5">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
