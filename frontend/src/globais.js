/**
 * Globais utilizados pelo sistema
 */
import * as moment from 'moment'
import 'moment/locale/pt-br'

export const getOficina = () => JSON.parse(localStorage.getItem('@fdc/oficina'))
export const getEmail = () => localStorage.getItem('@fdc/email')

// Período do Mês
moment.locale('pt-BR')
export const dataInicial = moment().startOf('month').format('L');
export const dataFinal   = moment().endOf('month').format('L');

// Últimos 30 dias
// export const dataInicial = moment().subtract(30, 'days').format('L');
// export const dataFinal   = moment().format('L');
