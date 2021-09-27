/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const PICK_TAG = createActionName('PICK_TAG');
export const UNPICK_TAG = createActionName('UNPICK_TAG');
// TODO - add other action types

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changePickTag = payload => ({ payload, type: PICK_TAG });
export const changeUnpickTag = payload => ({ payload, type: UNPICK_TAG });

// TODO - add other action creators

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case PICK_TAG:
      return {
        ...statePart,
        tags: action.payload,
      };
    case UNPICK_TAG:
      return {
        ...statePart,
        tags: [],
      };
    // TODO - handle other action types
    default:
      return statePart;
  }
}
