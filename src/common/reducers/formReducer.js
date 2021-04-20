export const initialLaunchFormState = {
  isLocal: true,
  launch_date_utc: new Date().toISOString("en-US", {
    timeZone: "America/Sao_Paulo",
  }),
  launch_site: "",
  mission_name: "",
  details: "",
  ships: [],
  rocket: "",
};

export const launchFormState = {
  ...initialLaunchFormState,
};

export const launchFormReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_INPUT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "HANDLE_TOGGLE_OPTION":
      return {
        ...state,
        [action.field]: state[action.field].includes(action.payload.id)
          ? state[action.field].filter((el) => el !== action.payload.id)
          : state[action.field].concat([action.payload.id]),
      };
    case "HANDLE_RESET":
      return {
        ...state,
        ...initialLaunchFormState,
      };
    default:
      return state;
  }
};
