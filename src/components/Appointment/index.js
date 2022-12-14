import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from './Confirm';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import "./styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  //Save function: calling bookInterview function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //transition to show Saving mode
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        transition(ERROR_SAVE, true)
        console.log(error.message)
      });
  };

  //Delete function: calling cancelInterview function
  function deletion() {
    //transition to show Deleting mode
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true)
        console.log(error.message)
      });
  };

  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={deletion}
          onCancel={back}
        />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message={"Could not save appointment"}
          onClose={back}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message={"Could not delete appointment"}
          onClose={back}
        />}
    </article>
  );
}