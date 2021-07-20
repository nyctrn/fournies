import React from "react";

const Buttons = (props) => (
  <>
    {props.table && !props.form && (
      <button
        id="new"
        style={{ position: "sticky", top: "0px" }}
        onClick={props.onButtonPress}
      >
        <i className="fas fa-plus-square text-primary"></i> | Νέα καταχώρηση
      </button>
    )}
  </>
);

export default Buttons;
