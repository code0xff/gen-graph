import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {
    menuSelect: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='Header'>
        <table className='MenuContainer'>
          <tbody>
            <tr>
              <td className='MenuBox'><span id='0' className='MenuLink' onClick={this.props.menuSelect}>create</span></td>
              <td className='MenuBox'><span id='1' className='MenuLink' onClick={this.props.menuSelect}>asset</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Header;
