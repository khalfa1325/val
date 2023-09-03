import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllFunction } from "./url";
import axios, { AxiosError } from 'axios';
import Swal from "sweetalert2";

const initialState = {
    user: {},
    razagazzo:{},
    status: "idle",
    error: null,
}

export const createUserOspita = createAsyncThunk(
    'user/register',
    async (data) => {
        const responce = await AllFunction.register(data)
        return responce
    }
)
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ data, viewport }) => {

        const responce = await AllFunction.login(data, viewport)
        return responce
    }
)

export const loginRagazo = createAsyncThunk(
    'user/loginRagazzo',
    async ({ data, viewport },{getState,rejectWithValue }) => {
        try {

            const key=getState().user.razagazzo.keySecret
            console.log(key)
            console.log(data)
            const responce = await AllFunction.loginRagazzo(data, viewport,key)
            return responce
        }catch(error){
            console.log(error)
            if (axios.isAxiosError(error)) {
                console.log(rejectWithValue(error))
                return rejectWithValue(error);
              }
              throw error;
        }

    }
)

export const registerRagazo=createAsyncThunk(
    'user/RegisterRagazzo',
    async(data)=>{
        console.log(data)
        const response=await AllFunction.RegisterRagazzo(data)
        return response
    }
)

 const createUser = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [createUserOspita.pending]: (state, action) => {
            // state.user=action.payload
        },

        [createUserOspita.fulfilled]: (state, action) => {
            state.user = action.payload
        },

        [createUserOspita.rejected]: (state, action) => {
            // state.user=action.payload
        },

        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },


        [loginRagazo.fulfilled]: (state, action) => {
            
            state.user = action.payload.data
            Swal.fire({
                title:'login ragasso is ok'+action.payload.data.user.name,
                text: 'Introduce el nombre aquí',
              })
            console.log(state.user)
        },
        [loginRagazo.rejected]: (state, action) => {
            state.status='failed'
            state.error = action.payload instanceof AxiosError ? action.payload : action.error.message;
            console.log(state.error)
        },


        [registerRagazo.fulfilled]:(state,action)=>{
            state.status = "succeeded";
            state.razagazzo=action.payload
        },
        [registerRagazo.rejected]:(state,action)=>{
            state.status='failed'
            state.error = action.payload;
            console.log(state.error)
        }
    }


})

export const { } = createUser.actions
export const create = (state) => state.user.user
export const registerR=(state)=>state.user.razagazzo
export const errorR=(state)=>state.user.error
export default createUser.reducer