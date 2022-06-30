import axios from 'axios';
export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);
    return axios({
        method: 'post',
        url: 'http://localhost:3003/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
