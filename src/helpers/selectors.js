export function getAppointmentsForDay(state, day) {

  const result = [];
  const dayObj = state.days.find((perDay) => perDay.name === day);

  if (!dayObj) return result;

  for (const id of dayObj.appointments) {
    result.push(state.appointments[id]);
  };

  return result;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  };

  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };

}

export function getInterviewersForDay(state, day) {

  const result = [];
  const dayObj = state.days.find((perDay) => perDay.name === day);

  if (!dayObj) return result;

  for (const id of dayObj.interviewers) {
    result.push(state.interviewers[id]);
  };

  return result;
}