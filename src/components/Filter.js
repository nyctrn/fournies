import React from "react";

const filtersArray = [
  { filterName: "noFilter", filterDesc: "Κανένα Φίλτρο" },
  { filterName: "s360", filterDesc: "S-360" },
  { filterName: "s380", filterDesc: "S-380" },
  { filterName: "bak", filterDesc: "BAK" },
  { filterName: "oak", filterDesc: "OAK" },
  { filterName: "supra", filterDesc: "Supra" },
];

const Filter = (props) => (
  <div style={{ float: "right" }}>
    {filtersArray.map((filter, i) => (
      <button id={filter.filterName} onClick={props.onFilter} key={i}>
        {filter.filterDesc}
      </button>
    ))}
  </div>
);

export default Filter;
