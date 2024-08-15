import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "@/redux/store";

type Profile = {
    id: number;
    userName: string;
    email: string;
    profileImage: string;
    roles: string[];

}



const initialState = {
    profile: null as Profile | null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<Profile>) {
            state.profile = action.payload;
        },
    },
});

export const {setProfile} = userSlice.actions;

export const selectProfile = (state: RootState) => state.user.profile;


export default userSlice.reducer;
