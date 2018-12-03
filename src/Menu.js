import React, { Component } from 'react';
import PropTypes from "prop-types";

class Menu extends Component {
  static propTypes = {
    setRow: PropTypes.func.isRequired,
    setCol: PropTypes.func.isRequired,
    setWidth: PropTypes.func.isRequired,
    setHeight: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  render(){
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>row</td>
            <td><input id='row' onChange={this.props.setRow} type='text' defaultValue={this.props.row}></input></td>
          </tr>
          <tr>
            <td>col</td>
            <td><input id='col' onChange={this.props.setCol} type='text' defaultValue={this.props.col}></input></td>
          </tr>
          <tr>
            <td>width</td>
            <td><input id='width' onChange={this.props.setWidth} type='text' defaultValue={this.props.width}></input></td>
          </tr>
          <tr>
            <td>height</td>
            <td><input id='height' onChange={this.props.setHeight} type='text' defaultValue={this.props.height }></input></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Menu;