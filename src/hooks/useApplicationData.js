import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((response) => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data }));
      });
  }, []);


  //Book Interview Function
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        //updating spots function
        const updateSpots = function(state, appointments) {
          let spots = 0;
          const dayObj = state.days.find(d => d.name === state.day);
          for (const id of dayObj.appointments) {
            const appointment = appointments[id];
            if (!appointment.interview) {
              spots++;
            }
          }
          const day = { ...dayObj, spots };
          const days = state.days.map(d => d.name === state.day ? day : d);
          return days;
        };

        const days = updateSpots(state, appointments);

        setState({ ...state, appointments, days });

      })
      .catch((error) => console.log(error.message));
  }

  //Cancel Interview Function
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //updating spots function
        const updateSpots = function(state, appointments) {
          let spots = 0;
          const dayObj = state.days.find(d => d.name === state.day);
          for (const id of dayObj.appointments) {
            const appointment = appointments[id];
            if (!appointment.interview) {
              spots++;
            }
          }
          const day = { ...dayObj, spots };
          const days = state.days.map(d => d.name === state.day ? day : d);
          return days;
        };

        const days = updateSpots(state, appointments);
        setState({ ...state, appointments, days });
      })
      .catch((error) => console.log(error.message));

  };


  return { state, setDay, bookInterview, cancelInterview };
}