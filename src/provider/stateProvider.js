import { createContext, useReducer, useContext } from "react";

// creates the data layer
export const StateContext = createContext();

// Higher Order Component
export const StateProvider = (
    {reducer, initialState, children}
) => (
    <StateContext.Provider
        value={useReducer(reducer, initialState)}
    >
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);