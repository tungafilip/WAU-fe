import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
	name: 'loading',
	initialState: {
		value: false
	},
	reducers: {
		enable: state => {
			state.value = true
		},
		disable: state => {
			state.value = false
		}
	}
})

// Action creators are generated for each case reducer function
export const { enable, disable } = counterSlice.actions

export default counterSlice.reducer
