import React from "react";

import "./Tabledata.css";

const Tabledata = (props) => {
  return (
    <tbody>
      {props.data.map((fournia, i) => {
        return (
          <tr key={i}>
            <td className="text-center align-middle">{fournia.id}</td>
            <td className="text-center align-middle">
              {fournia.date.split("-").reverse().join("/")}
            </td>
            <td className="text-center align-middle">
              {fournia.fournia !== "?"
                ? fournia.machine.toUpperCase() + "-" + fournia.fournia
                : ""}
            </td>
            <td className="text-center align-middle">{fournia.operator}</td>
            <td className="text-center align-middle">
              {fournia.coating.toUpperCase()}
            </td>
            <td className="text-center align-middle">{fournia.fakoi}</td>
            <td className="text-center align-middle">
              {!fournia.fakoiApothikis ? "-" : fournia.fakoiApothikis}
            </td>
            <td className="text-center align-middle d-none d-md-table-cell">
              {fournia.startTime}
            </td>
            <td className="text-center align-middle d-none d-md-table-cell">
              {fournia.endTime}
            </td>
            <td className="text-center align-middle">
              <button
                style={{ boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px" }}
                onClick={() => props.onPageViewer(fournia.id)}
                className="btn btn-light"
              >
                <i className="far fa-eye"></i>
              </button>
            </td>
            <td className="text-center align-middle">
              <button
                style={{ boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px" }}
                onClick={(e) => {
                  props.editHandler(e, fournia.id);
                }}
                className="btn btn-warning"
              >
                <i className="fas fa-edit"></i>
              </button>
            </td>
            {props.delPressed ? (
              fournia.id === props.delId ? (
                <td className="text-center align-middle">
                  <i
                    style={{
                      boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px",
                      marginBottom: "3px",
                    }}
                    id="confirmDel"
                    onClick={(e) => {
                      props.onDelPressed(e, fournia.id);
                    }}
                    className="fas fa-check-circle btn btn-success"
                  ></i>
                  {"  "}
                  <i
                    style={{
                      boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px",
                      marginBottom: "3px",
                    }}
                    id="cancelDel"
                    onClick={(e) => {
                      props.onDelPressed(e, fournia.id);
                    }}
                    className="fas fa-times-circle btn btn-danger"
                  ></i>
                </td>
              ) : (
                <td className="text-center align-middle">
                  <button
                    style={{ boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px" }}
                    id="del"
                    onClick={(e) => {
                      props.onDelPressed(e, fournia.id);
                    }}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash-alt text-center"></i>
                  </button>
                </td>
              )
            ) : (
              <td className="text-center align-middle">
                <button
                  style={{ boxShadow: "rgba(25, 25, 25, 0.29) 2px 2px 8px" }}
                  id="del"
                  onClick={(e) => {
                    props.onDelPressed(e, fournia.id);
                  }}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash-alt text-center "></i>
                </button>
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Tabledata;
