import config from '../config';
const BASE_URL = config.apiBaseUrl+"/formdata"; 

export const createFormData = (formData) => {
    const data = new FormData();
    data.append('factura', formData.factura);

    for (let key in formData) {
        if (formData.hasOwnProperty(key) && key !== 'factura') {
            data.append(key, formData[key]);
        }
    }

    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: data
    })
    .then(response => response.json());
}


export const getAllFormData = () => {
    return fetch(`${BASE_URL}`)
    .then(response => response.json());
}

export const getSingleFormData = (id) => {
    return fetch(`${BASE_URL}/${id}`)
    .then(response => response.json());
}

export const updateFormData = (id, data) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}

export const deleteFormData = (id) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json());
}