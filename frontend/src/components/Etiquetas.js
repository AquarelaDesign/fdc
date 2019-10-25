import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardFooter, } from 'reactstrap'
import classNames from 'classnames'
import { mapToCssModules } from 'reactstrap/lib/utils'
import { Bar, Line } from 'react-chartjs-2'

const propTypes = {
  icon: PropTypes.string,
  mainText: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  chartType: PropTypes.string,
  chart: PropTypes.bool,
  chartData: PropTypes.object,
  chartOptions: PropTypes.object,
}

const defaultProps = {
  icon: 'fa fa-plus',
  mainText: '',
  color: 'primary',
  value: '',
  variant: '',
  link: '#',
  chartType: '0',
}

class Etiquetas extends Component {
  render() {
    const { 
      icon,
      mainText, 
      color, 
      value, 
      className, 
      cssModule, 
      variant,
      footer, 
      link,
      chartType, chart, chartData, chartOptions,
      ...attributes 
    } = this.props

    const padding = ''

    const card = { 
      style: 'clearfix', 
      bgColor: '', 
      color: color, 
      icon: icon, 
      classes: ''
    }
    card.classes = mapToCssModules(
      classNames(className, card.style, padding.card), 
      cssModule
    )
    
    const classesCard = mapToCssModules(
      classNames(className, card.style, card.bgColor), 
      cssModule
    )

    const blockIcon = function (icon) {
      const classes = classNames(icon, 'font-2xl mr-6 float-right');
      return (<i className={classes}></i>)
    }

    const cardChart = function () {
      if (chart) {
        if (chartType === '0') {
          return (
            <div className="chart-wrapper" style={{ height: '70px' }}>
              <Line data={chartData} options={chartOptions} height={70} />
            </div>
          )
        } else {
          return (
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <Bar data={chartData} options={chartOptions} height={70} />
            </div>
          )
        }
      }
    }

    const cardFooter = function () {
      if (footer) {
        return (
          <CardFooter className="px-2 py-2">
            <a className="font-weight-bold font-xs btn-block" href={link}>Detalhes
              <i className="fa fa-angle-right float-right font-lg"></i></a>
          </CardFooter>
        )
      }
    }

    return (
      <Card className={classesCard} {...attributes}>
        <CardBody className="pb-0" >
          {blockIcon(card.icon)}
          <div className="text-value">{value}</div>
          <div className="text-uppercase font-weight-bold font-xs">
            {mainText}
          </div>
        </CardBody>
        {cardChart()}
        {cardFooter()}
      </Card>
    );
  }
}

Etiquetas.propTypes = propTypes;
Etiquetas.defaultProps = defaultProps;

export default Etiquetas;
