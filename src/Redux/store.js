import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './loading';

export default configureStore({
	reducer: {
		loading: loadingReducer,
	}
})
