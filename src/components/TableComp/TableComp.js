import React from "react";

import Tabledata from "../Tabledata/Tabledata";
import { Table } from "react-bootstrap";
import "./TableComp.css";
import Spinner from "./../Spinner/Spinner";

const TableComp = (props) => (
  <>
    <Table striped bordered hover responsive="md">
      <thead>
        <tr style={{ textAlign: "center" }}>
          {[
            "#",
            "Ημερομηνία",
            "Φουρνιά",
            "Χειριστής",
            "Επίστρωση",
            "Σύνολο φακών",
            "Φακοί αποθήκης",
            "Ώρα έναρξης",
            "Ώρα λήξης",
          ].map((th) => (
            <th key={th}>{th}</th>
          ))}
          <th colSpan="3"></th>
        </tr>
      </thead>
      <Tabledata
        data={props.data}
        editHandler={props.editHandler}
        isEditable={props.isEditable}
        onEditSubmit={props.onEditSubmit}
        delId={props.delId}
        onDelPressed={props.onDelPressed}
        delPressed={props.delPressed}
        onPageViewer={props.onPageViewer}
        filter={props.filter}
      />
    </Table>
    {props.spinner && <Spinner />}
    {props.emptyArrayMsg && props.data.length === 0 && (
      <h4 className="text-center">Δεν υπάρχουν καταχωρήσεις</h4>
    )}
    {props.data.length === 0 && props.filter && !props.emptyArrayMsg && (
      <h4 className="text-center">Δεν βρέθηκαν αποτελέσματα</h4>
    )}
  </>
);

export default TableComp;
