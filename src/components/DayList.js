import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const dayListItems = props.days.map((day) =>
    <li>
      {<DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={day.setDay}
      />}
    </li>
  );

  return (
    <ul>{dayListItems}</ul>
  );
}


