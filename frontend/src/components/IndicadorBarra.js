import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Progress } from 'reactstrap'
// import { FormattedNumber } from 'react-intl'

const propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  percent: PropTypes.string,
  color: PropTypes.string,
}

const defaultProps = {
  icon: 'fa fa-plus',
  title: '',
  value: '',
  percent: '',
  color: 'warning',
}

class IndicadorBarra extends Component {
  render() {
    const {
      icon, title, value, percent, color,
    } = this.props

    return (
      <div className="progress-group">
        <div className="progress-group-header">
          <i className={`${icon} progress-group-icon`}></i>
          <span className="title">{title}</span>
          <span className="ml-auto font-weight-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(value)}
            <span className="text-muted small">
              &nbsp;(
              {new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(percent)}
              %)
              {/* `(${percent}%)` */}
            </span>
          </span>
        </div>
        <div className="progress-group-bars">
          <Progress className="progress-xs" color={color} value={percent} />
        </div>
      </div>
    )
  }
}

IndicadorBarra.propTypes = propTypes;
IndicadorBarra.defaultProps = defaultProps;

export default IndicadorBarra;
