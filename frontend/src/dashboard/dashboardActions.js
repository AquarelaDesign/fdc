import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function getSummary(values) {
    return submit(values, `${consts.API_URL}/wfcpas`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: 'WFCPAS_ETIQUETAS_FETCHED', payload: resp.data }
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }
}
