import axios from "axios";
import {addFiles, deleteFileAction, setFiles} from "../redux/fileReducer";
import {addUploadFile, changeUploudFile, showeUpLoader} from "../redux/uploudReducer";
import {hideLoader, showeLoader} from "../redux/appUtils";

export function getFiles(dirId,sort) {
    return async dispatch => {
        dispatch(showeLoader())
        try {
            let url = `http://localhost:5000/api/files`
            if(dirId){
                url = `http://localhost:5000/api/files?parent=${dirId}`
            }
            if(sort){
                url =`http://localhost:5000/api/files?sort=${sort}`
            }
            if(sort && dirId){
                url = `http://localhost:5000/api/files?sort=${sort}&parent=${dirId}`
            }



            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
            console.log(response.data)
        } catch (e) {
        }
        /* finnaly  бо воно ж ше може помилку вибити*/
        finally {
            dispatch(hideLoader())

        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {

            const response = await axios.post(`http://localhost:5000/api/files`, {
                name: name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFiles(response.data))

        } catch (e) {
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }

            const uploadFile = {name:file.name, progress:0,id:Date.now()}
            dispatch(showeUpLoader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress:
                    progressEvent => {
                        const totalLength =
                            progressEvent.lengthComputable
                                ?
                                progressEvent.total : progressEvent.target.getResponseHeader('content-length')
                                ||
                                progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log('total', totalLength)
                        if (totalLength) {
                            console.log(process)
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                            dispatch(changeUploudFile(uploadFile))
                        }
                    }
            })
            dispatch(addFiles(response.data))
        } catch (e) {
        }
    }
}


export async function downloadFile(file) {
    const response = await fetch(`http://localhost:5000/api/files?id=${file._id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    console.log('downloadFile11111111')
    if (response.status === 200) {
        /* блоб подібний фізичному файлу обєкт*/
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}


export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            console.log(e)
        }
    }
}


export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/files/search?search=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            // console.log(response.data)
            dispatch(setFiles(response.data))
        } catch (e) {
        console.log(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}






