import axios from "axios";
import {setUser} from "../redux/userReducer";
import {API_URL} from "../accets/config";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            password
        })
        await console.log(response.data.message)

    } catch (error) {

        console.log(error)
        alert(error)

    }

}
export const login = (email, password) => {
    return async dispatch => {

        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
              dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            console.log('11',response.data)


        } catch (error) {

            alert(error.response.data.message)
             localStorage.removeItem('token')


        }
    }

}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            alert(error.response)
            localStorage.removeItem('token')

        }
    }
}
export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file',file)
            const response = await axios.post(`${API_URL}api/files/avatar`,formData,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
            localStorage.setItem('token', response.data)
        } catch (error) {
            alert("error in upload avatar ", error.response)

        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (error) {
            alert("error in delete avatar ", error.response)

        }
    }
}

