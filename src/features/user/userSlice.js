import {createSlice} from "@reduxjs/toolkit"
import {getAddress} from "../../services/apiGeocoding"
import {createAsyncThunk} from "@reduxjs/toolkit"

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

let position
let address

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  }
);

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    updateName(state, action){
      state.userName = action.payload
    }
  },
  extraReducers: builder => builder.addCase(fetchAddress.pending, (state, action) =>{
    state.status = "loading"
  }).addCase(fetchAddress.fulfilled, (state, action) => {
    state.position = position
    state.address = address
    state.status = "idle"
  }).addCase(fetchAddress.rejected, (state, action) => {
    state.status = "error"
    state.error = action.error.message
  })
})


export const {updateName} = userSlice.actions
export default userSlice.reducer
export const getUsername = store => store.user.userName