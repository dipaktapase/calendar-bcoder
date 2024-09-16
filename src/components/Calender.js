import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isToday,
  isBefore,
} from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Header with navigation
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center py-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="px-4 py-2 rounded bg-blue-500 text-white">
          Prev
        </button>
        <h2 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="px-4 py-2 rounded bg-blue-500 text-white">
          Next
        </button>
      </div>
    );
  };

  // Days of the week
  const renderDays = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
      <div className="grid grid-cols-7 gap-6 text-center bg-gray-100 py-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold text-sm">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = new Date();
    console.log(today)

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");


        days.push(
          <div
            key={day}
            className={`border p-4 h-24 text-right relative ${
              !isSameMonth(day, monthStart)
              ? "bg-gray-200"
                : isToday(day)
                ? "bg-red-100 text-red-600 font-bold" 
                : isBefore(day, today)
                ? "bg-gray-100 text-gray-500" 
                : "bg-white hover:bg-blue-100 cursor-pointer"
            }`}
          >
            <span className="text-sm font-bold">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="w-full m-4 bg-white p-4 shadow-lg rounded-lg">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
