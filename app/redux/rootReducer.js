import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as mapReducer } from "../modules/map"
import { reducer as profileReducer } from "../modules/profile"


// Combine all the reducers
const rootReducer = combineReducers({ authReducer, mapReducer, profileReducer});

export default rootReducer;