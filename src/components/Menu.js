import React from "react";
const Menu = () => (
  <div className="mobileShow desktopHide controlButtons">
    <button type="button" id="btnUp" className="btn btn-success btn-up">
      up
    </button>
    <button type="button" id="btnLeft" className="btn btn-success btn-left">
      left
    </button>
    <button type="button" id="btnRight" className="btn btn-success btn-right">
      right
    </button>
    <button type="button" id="btnDown" className="btn btn-success btn-down">
      down
    </button>
  </div>
);

export default Menu;
