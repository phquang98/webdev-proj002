import React, { FC, Fragment } from "react";

const TransacList: FC = () => {
  return (
    <Fragment>
      <h3>History</h3>
      <ul className="list">
        <li className="minus">
          Cash <span>-$400</span>
          <button className="delete-btn">x</button>
        </li>
      </ul>
    </Fragment>
  );
};

export default TransacList;
