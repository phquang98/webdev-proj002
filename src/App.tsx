import React, { FC } from "react";

import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransacList from "./components/TransacList";
import AddTransac from "./components/AddTransac";
import "./App.css";

// checking git hooks
const App: FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransacList />
        <AddTransac />
      </div>
    </div>
  );
};

export default App;
