export function getAppointmentsForDay(state, day) {

  const result = [];
  const filteredDay = state.days.filter((perDay) => perDay.name === day);

  if (!filteredDay[0]) return result;

  for (const id of filteredDay[0].appointments) {
    result.push(state.appointments[id]);
  };

  return result;
}
