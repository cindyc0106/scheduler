import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  //transition function
  function transition(newMode, replace = false) {
    if (replace) {
      //history to stay the same length, just replace the last index
      return setHistory(prev => {
        const copy = [...prev.slice(0, prev.length - 1), newMode]
        return copy
        
      });
    }
    //add the newMode to the history
    setHistory(prev => {
      const copy = [...prev, newMode];
      return copy;
    });
  };
  //back function
  function back() {
    setHistory(prev => {
      if (prev.length > 1) {
        const copy = prev.slice(0, prev.length - 1);
        return copy;
      }
      return prev;
    });
  };

  return { 
    mode: history[history.length - 1], 
    transition, 
    back 
  };
}
