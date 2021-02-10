import React, { FC, Fragment, useState } from "react";

const AddTransac: FC = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <Fragment>
      <h3>Add new transaction</h3>
      <form>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            value={text}
            onChange={(evt): void => setText(evt.currentTarget.value)}
            type="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            value={amount}
            onChange={(evt): void => setAmount(Number(evt.currentTarget.value))}
            type="number"
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </Fragment>
  );
};

export default AddTransac;
