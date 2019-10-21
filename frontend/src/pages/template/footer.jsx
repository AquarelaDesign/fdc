import React from 'react';
import PropTypes from 'prop-types';
import packageInfo from '../../../package.json';

const { version: packageVersion } = packageInfo;

const Footer = ({ children, includeVersionInfo }) => (
  <footer className="main-footer">
    {includeVersionInfo
      && (
      <div className="hidden-xs">
        <strong> 
            Copyright &copy; 2019 - 
            <a href="http://www.fichadocarro.com.br" target="_blank" rel="noopener noreferrer"> Ficha do Carro</a>
            {' v'}
            {packageVersion}
        </strong>
      </div>
      )}
    {'\u00A0'}
  </footer>
);

Footer.propTypes = {
  children: PropTypes.node,
  includeVersionInfo: PropTypes.bool,
};

Footer.defaultProps = {
  children: null,
  includeVersionInfo: true,
};

export default Footer;
