import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
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
