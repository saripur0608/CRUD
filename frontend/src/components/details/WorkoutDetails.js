import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import editIcon from "../../assets/img/editer.png";

import { Backdrop, Collapse, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Button, Drawer, message, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext";
// date fns package
import InfoIcon from "@mui/icons-material/Info";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { SocialIcons } from "../drawer_content/SocialIcons";
import { Stepper } from "../steppers/Stepper";
import "./workout_details.scss";

export const WorkoutDetails = ({
  workout,
  index,
  setSectionBorder,
  setbg,
  sectionBorder,
  displayContainer,
  listClicked,
  cardClicked,
}) => {
  const { dispatch } = useWorkoutsContext();

  const [className, setClassName] = React.useState(`workout-details`);
  const [containerBoxShadow, setcontainerBoxShadow] = React.useState(
    `0 0 0 0.1rem rgba(26, 172, 131, 0.1)`
  );
  const [showCollapse, setshowCollapse] = React.useState(true);
  const handleCollapseclick = () => {
    if (showCollapse === true) {
      setshowCollapse(false);
      setcontainerBoxShadow(`0 0 0 0.1rem rgba(26, 172, 131, 0.65`);
    } else {
      setshowCollapse(true);
      setcontainerBoxShadow(`0 0 0 0.1rem rgba(26, 172, 131, 0.1`);
    }
  };

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  //Concerning the Popconfirm antd
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openPopconfirm, setOpenPopconfirm] = useState(false);
  const [showBorder, setshowBorder] = useState(false);
  const [border, setborder] = useState("1px solid lightgray");

  const confirm = () => {
    handleDelete();
    setOpenBackdrop(!openBackdrop);
    message.success("Deleted !", 0.6); //This is a prompt message for success, and it will disappear in 0.6 seconds
  };
  const cancel = () => {
    setOpenPopconfirm(false);
    setOpenBackdrop(!openBackdrop);
    setshowBorder(!showBorder);
    message.error("Kept !", 0.6);
  };
  const handleDeleteWorkout = () => {
    setOpenPopconfirm(true);
    setOpenBackdrop(!openBackdrop);
    setshowBorder(!showBorder);
    setcontainerBoxShadow(`none`);
    setSectionBorder("");
  };
  //Concerning the Drawer of antd
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openInfosDrawer, setOpenInfosDrawer] = useState(false);

  const handleShare = () => {
    setOpenDrawer(true);
    setSectionBorder("");
  };
  const handleInfos = () => {
    setOpenInfosDrawer(true);
    setSectionBorder("");
  };
  const handleEdit = () => {
    setborder("1px solid black");
    setSectionBorder("");
  };

  const onClose = () => {
    setOpenDrawer(false);
  };
  React.useEffect(() => {
    if (workout) {
      setTimeout(() => setClassName("changeBGColor workout-details"), 2000); //to delete later
    }
    if (openDrawer === true || openInfosDrawer) {
      setborder("1px solid black");
    } else if (openDrawer === false || !openInfosDrawer) {
      setborder("");
    }
    console.log(displayContainer);
    if (listClicked === true) {
      setclassNameA("workout-details-container");
      setSectionBorder("");
    }
    if (cardClicked === true) {
      setclassNameA("workout-details-container-as-grid");
      setSectionBorder("1.5px solid #1aac83");
    }
  }, [openDrawer, openInfosDrawer, listClicked]);

  const handleContainerHover = () => {
    if (sectionBorder === `1.5px solid #1aac83`) {
      setcontainerBoxShadow(
        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      );
    }
  };
  const handleContainerLeave = () => {
    if (sectionBorder === `1.5px solid #1aac83`) {
      setcontainerBoxShadow(!containerBoxShadow);
    }
  };
  // let displayContainer =
  //   sectionBorder === `1.5px solid #1aac83` ? "card" : "onePerRow";
  function VarTestFunct(Vartest) {
    if (sectionBorder === `1.5px solid #1aac83` && listClicked === true) {
      Vartest = true;
    } else {
      Vartest = false;
    }
    return Vartest;
  }
  const [classNameA, setclassNameA] = useState("hahaha");
  return (
    <>
      <div
        className={`
         site-drawer-render-in-current-wrapper
         workout-details-container
         workout-details-container${index}
         ${showBorder === true ? `border-selected` : ``} 
         ${
           sectionBorder === `1.5px solid #1aac83`
             ? `workout-details-container-as-grid`
             : ""
         } 
         ${classNameA}
         `}
        style={{
          boxShadow: containerBoxShadow,
          border: border,
        }}
        onMouseOver={handleContainerHover}
        onMouseLeave={handleContainerLeave}
      >
        <Collapse in={showCollapse} collapsedSize="90px">
          <Stack
            className={className}
            direction="row"
            justifyContent={
              sectionBorder === `1.5px solid #1aac83` ? "center" : ""
            }
            alignItems={sectionBorder === `1.5px solid #1aac83` ? "center" : ""}
          >
            <div
              className="work-details-left-content"
              style={{
                width: "80%",
              }}
            >
              <div
                className="work-details-left-content-inner"
                style={{
                  display: "flex",
                  flexDirection: `column`,
                  justifyContent:
                    sectionBorder !== `1.5px solid #1aac83` ? "flex-start" : "",
                  alignItems:
                    sectionBorder !== `1.5px solid #1aac83` ? "flex-start" : "",
                }}
              >
                <IconButton
                  className="work-details-left-inner-iconbtn"
                  style={{
                    alignSelf:
                      sectionBorder !== `1.5px solid #1aac83`
                        ? "flex-start"
                        : "",
                  }}
                  onClick={handleCollapseclick}
                >
                  {showCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <h4>{workout.title}</h4>
                <div className="work-details-left-inner-load">
                  <span className="work-details-left-inner-load-span1">
                    <strong>
                      Load (<span className="span1-kg">kg</span> ) :
                    </strong>
                  </span>
                  <span className="work-details-left-inner-load-span2">
                    {workout.load}
                  </span>
                </div>

                <div className="work-details-left-inner-reps">
                  <span className="work-details-left-inner-reps-span1">
                    <strong>Number of reps : </strong>
                  </span>
                  <span className="work-details-left-inner-reps-span2">
                    {workout.reps}
                  </span>
                </div>

                <div className="work-details-left-inner-date">
                  <span>
                    {formatDistanceToNow(new Date(workout.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="work-details-right-content"
              style={{ width: "20%" }}
            >
              <div className="work-details-right-inner control-btns">
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  open={openPopconfirm}
                >
                  <IconButton
                    className="work-details-right-inner-iconbtn"
                    //differnce  between setOpenBackdrop(false) and setOpenBackdrop(cur=>!cur) or setOpenBackdrop(!openBackdrop) is that the 2 last statement will create a toggle logic hence a infinite loop onclick on esc , whereas the 1st one will trigger only once
                    onKeyDown={() => {
                      setOpenPopconfirm(false);
                      setshowBorder(false);
                      setOpenBackdrop(false);
                    }} //onClick on Esc key
                    // never use onBlur method here because it prevents the items from being deleted
                    onClick={handleDeleteWorkout}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Popconfirm>

                <IconButton
                  className="work-details-right-inner-iconbtn"
                  onClick={handleShare}
                >
                  <ShareIcon></ShareIcon>
                </IconButton>

                <IconButton
                  className="work-details-right-inner-iconbtn"
                  onClick={handleInfos}
                >
                  <InfoIcon />
                </IconButton>

                <IconButton
                  className="icon-btn-edit work-details-right-inner-iconbtn"
                  onBlur={() => setborder("")}
                  onKeyDown={() => setborder("")}
                  onClick={handleEdit}
                >
                  <img className="edit-img" src={editIcon} alt="" />
                </IconButton>
              </div>
            </div>
          </Stack>
        </Collapse>
      </div>
      <Backdrop
        className="workout-details-backdrop"
        // onKeyDown={() => setOpenBackdrop(!openBackdrop)}
        sx={{ bgcolor: "rgba(0, 0, 0, 0.2)", zIndex: 1 }}
        open={openBackdrop}
      >
        {/* content */}
      </Backdrop>
      {/* Antd Drawer  */}
      <div className="workout-details-drawer-container">
        <Drawer
          className="workout-details-drawer"
          title="Share on..."
          placement="top"
          closable={true}
          onClose={onClose}
          open={openDrawer}
          // closeIcon
          getContainer={`.workout-details-container${index}`}
          style={{
            position: "absolute",
          }}
        >
          <div className="workout-details-imgs">
            <SocialIcons workoutTitle={workout.title}></SocialIcons>
          </div>
        </Drawer>
      </div>
      <div className="workout-infos-drawer-container">
        <Drawer
          className="workout-infos-drawer"
          placement="right"
          closable={true}
          onClose={() => {
            setOpenInfosDrawer(false);
          }}
          open={openInfosDrawer}
          size={"large"}
          destroyOnClose
          // destroyOnClose === Whether to unmount child components on closing drawer or not
          extra={
            <Space>
              <Button
                type="dashed"
                size="large"
                onClick={() => {
                  setOpenInfosDrawer(false);
                }}
              >
                {`Hide`}
              </Button>
            </Space>
          }
        >
          <div className="workout-infos-wrapper">
            <Stepper
              {...{ setSectionBorder, setOpenInfosDrawer, setbg }}
              workoutTitle={workout.title}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};