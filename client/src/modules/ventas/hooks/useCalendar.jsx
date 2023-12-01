import { useReducer } from "react";

function calendarReducer(state, action) {
  switch (action.type) {
    case "create_state": {
      return {
        createState: true,
        selectState: false,
        loadState: false,
      };
    }
    case "update_state": {
      return {
        createState: false,
        selectState: true,
        loadState: false,
      };
    }
    case "base_state": {
      return {
        createState: false,
        selectState: false,
        loadState: false,
      };
    }
    case "loading_state": {
      return {
        createEvent: false,
        selectState: false,
        loadState: true,
      };
    }
  }
}
