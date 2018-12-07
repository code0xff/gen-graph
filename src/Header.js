import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <table className='MenuContainer'>
          <tr>
            <td className='MenuBox'><span className='MenuLink'>create</span></td>
            <td className='MenuBox'><span className='MenuLink'>asset</span></td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Header;