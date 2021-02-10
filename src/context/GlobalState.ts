import React, { createContext, useReducer } from "react";

const initialState = {
  transactionClt: [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 }
  ]
};

// in order all others compo get access to this global state, we need a provider and wrap that provider to everything
export const GlobalCtx = createContext(initialState);
