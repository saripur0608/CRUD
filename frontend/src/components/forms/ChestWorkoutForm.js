import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Button } from "@mui/material";
import { Input, Modal, Tooltip } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import exercisesData from "../../assets/staticData/chestExercises.json";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
import { ChestExosBtnsList as ChestExosList } from "../lists/exosLists/ChestExosBtnsList";
import "./form_styles.scss";

const WorkoutForm = ({ setCurrentPage }) => {
  const currentLocation = useLocation();
  let currentLocat = currentLocation.pathname;
  const chestExos = exercisesData.exercises.chest_Exercises;

  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [suggestiveListBorder, setSuggestiveListBorder] = useState("");
  const [showFormNewWindow, setShowFormNewWindow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const pureString = str.replace(/(?:\r\n|\r|\n)/g, '');
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      if (showFormNewWindow === true) {
        //close the form modal when user types all required info for a workout
        setShowFormNewWindow(false);
      }
      //on submit, redirect the user to the 1st page
      setCurrentPage(1);
    }
  };

  //3 JSX blocs
  const ButtonToggleModalDom = (
    <Button
      disableRipple
      onClick={() => setShowFormNewWindow(!showFormNewWindow)}
      className="up-btn-link"
      sx={{
        "&:hover": { background: "none" },
      }}
    >
      <Tooltip
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ fontSize: "10px" }}>
              {showFormNewWindow
                ? `Minimize this form`
                : `Open this form in a new window.`}
            </span>
          </div>
        }
      >
        <img
          src={
            showFormNewWindow
              ? "https://cdn-icons-png.flaticon.com/512/109/109724.png"
              : `https://cdn-icons-png.flaticon.com/512/2989/2989869.png`
          }
          alt=""
          width={`34px`}
          height={`34px`}
        />
      </Tooltip>
    </Button>
  );
  const formDOM = (
    <>
      <div
        // this means that the class toggle-form-btn will always be applied , and toggle-form-btn-modal class will be added to this div element as a second class if showFormNewWindow ===true
        className={`toggle-form-btn ${
          showFormNewWindow ? "toggle-form-btn-modal" : ""
        }`}
      >
        {ButtonToggleModalDom}
      </div>
      <form className="chest-workouts-form" onSubmit={handleSubmit}>
        <div className="chest-workouts-form-inner">
          {showFormNewWindow === false && <h3>Add a New Workout</h3>}
          <label>Excercise Title : </label>

          <Tooltip
            zIndex={`999`}
            title={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ fontSize: "12px" }}>
                  You can always pick the exercise you want from the list below
                  !
                </span>
              </div>
            }
            color="rgba(74, 72, 73,0.75)"
          >
            <Input
              value={title}
              onMouseOver={() => {
                setSuggestiveListBorder("0.5px solid rgba(26, 172, 131,0.25)");
              }}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              status={
                emptyFields.includes("title") && title.length === 0
                  ? "error"
                  : ""
              }
              // title.length === 0 means that nothing is being typed by the user
              placeholder={
                emptyFields.includes("title") && title.length === 0
                  ? `You have forgotten to type a title`
                  : "Type a title"
              }
              prefix={
                emptyFields.includes("title") && title.length === 0 ? (
                  <PriorityHighIcon />
                ) : null
              }
              allowClear
            />
          </Tooltip>

          <label>Load (in kg) :</label>
          <Input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            status={
              emptyFields.includes("load") && load.length === 0 ? "error" : ""
            }
            placeholder={
              emptyFields.includes("load") && load.length === 0
                ? `You have forgotten to type a load`
                : "Type a load"
            }
            prefix={
              emptyFields.includes("load") && load.length === 0 ? (
                <PriorityHighIcon />
              ) : null
            }
            allowClear
          />

          <label>Number of Reps :</label>
          <Input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            status={
              emptyFields.includes("reps") && reps.length === 0 ? "error" : ""
            }
            // reps.length === 0 means that nothing is being typed by the user
            placeholder={
              emptyFields.includes("reps") && reps.length === 0
                ? `You have forgotten to type reps`
                : "Type reps"
            }
            prefix={
              emptyFields.includes("reps") && reps.length === 0 ? (
                <PriorityHighIcon />
              ) : null
            }
            allowClear
          />

          <div className={showFormNewWindow === true ? "d_flex" : ""}>
            <button className="chest-form-btn">Add Workout</button>
          </div>
        </div>
        <div className="error-msg-container">
          {error && (
            <div
              className={
                showFormNewWindow ? "error-msg-modal" : "form-msg-error"
              }
            >
              {error}
            </div>
          )}
        </div>
      </form>
    </>
  );
  const chestExosList = (
    <div className="chest-suggest-btns">
      {currentLocat === "/chest" && (
        <ChestExosList
          setTitle={setTitle}
          chestExos={chestExos}
          suggestiveListBorder={suggestiveListBorder}
        />
      )}
    </div>
  );

  return (
    <>
      {showFormNewWindow === false && (
        <>
          <div className="chest-workout-form-container">
            <>{!showFormNewWindow && formDOM}</>
            <>{chestExosList}</>
          </div>
        </>
      )}

      {showFormNewWindow === true && (
        <>
          <Modal
            className="chest-form-ant-modal"
            open={showFormNewWindow}
            maskClosable={true}
            closable={false}
            keyboard={true}
            mask={true}
            onOk={() => setShowFormNewWindow(false)}
            onCancel={() => setShowFormNewWindow(false)}
            width={"70%"}
            footer={null}
            title="Add a New Workout"
          >
            <div className="chest-workout-form-container">
              <>{showFormNewWindow === true && formDOM}</>
              <>{chestExosList}</>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default WorkoutForm;

{
  /* <svg
          className="up-svg-icon"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          viewBox="0 0 14 14"
          role="img"
          width={`34px`}
          height={`34px`}
        >
          <path d="M12 7.252h2V14H0V0h6.602v2.014H2v9.971h10V7.252zM8.602 0v2.014h2.088L6.795 5.935l1.414 1.424L12 3.54v1.898h2V0H8.602z"></path>
        </svg> */
}