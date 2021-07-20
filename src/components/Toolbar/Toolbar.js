import React from "react";

import DrawerToggleButton from "../DrawerToggleButton/DrawerToggleButton";
import "./Toolbar.css";

const Toolbar = (props) => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div>
        <DrawerToggleButton click={props.drawerToggleClickHandler} />
      </div>
      <div className="toolbar__logo">
        <span onClick={props.onLogoClick} id="back">
          Fournies
        </span>
      </div>
      <div className="spacer"></div>
    </nav>
  </header>
);

export default Toolbar;
