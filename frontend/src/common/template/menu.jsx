import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        
        <MenuItem path='/tfcpas' label='PASSAGENS' icon='flag' />
        <MenuItem path='/tfcetq' label='ETIQUETAS' icon='tags' />
        <MenuItem path='/tfcvei' label='VEICULOS' icon='car' />
        <MenuItem path='/tfcusu' label='USUÁRIOS' icon='users' />
        <MenuItem path='/tfcini' label='INDICADORES' icon='pie-chart' />
        <MenuItem path='/tfcmsg' label='MENSAGENS' icon='weixin' />
        <MenuItem path='/tfcmon' label='MONITOR' icon='dashboard' />
        
        <MenuTree label='ESTOQUE' icon='truck'> 
            <MenuItem path='tfcpec' label='Cadastro de Produto' icon='edit' />
            <MenuItem path='tfcest' label='Histórico de Movimentação' icon='list' />
        </MenuTree>

        <MenuTree label='NOTAS FISCAIS' icon='file-text-o'> 
            <MenuItem path='tfcnfe' label='ENTRADA de Nota Fiscal' icon='sign-in' />
            <MenuItem path='tfcnfs' label='CANCELAMENTO/DEVOLUÇÃO NF' icon='window-close-o' />
            <MenuItem path='tfcnfm' label='MONITOR DE DOCS FISCAIS' icon='tasks' />
        </MenuTree>

        <MenuItem path='/tfcfin' label='CONTAS A PAGAR/RECEBER' icon='money' />
    </ul>
)