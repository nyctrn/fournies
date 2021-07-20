import React from "react";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  let drawerClasses = "side-drawer";

  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <p
            style={{ fontSize: "1.2rem", marginBottom: "0", fontWeight: "500" }}
          >
            Fournies Web App v0.20
          </p>
          <span style={{ fontSize: "1rem" }}>
            Μία εφαρμογή καταχώρησης φουρνιών για το τμήμα CRIZAL.
          </span>
        </li>
        <li>
          <a style={{ fontSize: "1rem" }} href="mailto:marioskourk@gmail.com">
            marioskourk@gmail.com
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
