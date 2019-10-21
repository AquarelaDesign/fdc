import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from  '../common/widget/valueBox'
import Row from  '../common/layout/row'

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const { oficina } = this.props.user
        this.props.getSummary({'email': oficina.e_mail, 'idtrans':'||' })
    }

    render() {
        const { qtetqn, qtetqp, qtetqtot, qtetqv, qtperd, qtreal } = this.props.summary
        return (
            <div> 
                <ContentHeader title='Etiquetas de Revisão' small='' />
                <Content>
                    <Row> 
                        <ValueBox cols='12 2' color='gray' icon='tags' value={qtetqtot} text='Abertas' />
                        <ValueBox cols='12 2' color='green' icon='check-square-o' value={qtetqn} text='Normais' />
                        <ValueBox cols='12 2' color='yellow' icon='warning' value={qtetqp} text='Próximas' />
                        <ValueBox cols='12 2' color='red' icon='close' value={qtetqv} text='Vencidas' />
                        <ValueBox cols='12 2' color='blue' icon='thumbs-up' value={qtreal} text='Efetuadas' />
                        <ValueBox cols='12 2' color='black' icon='thumbs-down' value={qtperd} text='Perdidas' />
                    </Row> 
                </Content> 
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary, user: state.auth.user})
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)