import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Menu.css';

class Menu extends Component {
  static propTypes = {
    setRow: PropTypes.func.isRequired,
    setCol: PropTypes.func.isRequired,
    setWidth: PropTypes.func.isRequired,
    setHeight: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    mapList: PropTypes.array.isRequired
  };

  _setRow = (e) => {
    let rowSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (rowSize > 50) {
      alert('row의 최대 사이즈는 50입니다.');
      e.target.value = 50;
      rowSize = 50;
    }
    this.props.setRow(rowSize);
  }
  _setCol = (e) => {
    let colSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (colSize > 50) {
      alert('col의 최대 사이즈는 50입니다.');
      e.target.value = 50;
      colSize = 50;
    }
    this.props.setCol(colSize);
  }
  _setWidth = (e) => {
    let widthSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (widthSize > 1000) {
      alert('width의 최대 사이즈는 1000입니다.');
      e.target.value = 1000;
      widthSize = 1000;
    }
    this.props.setWidth(widthSize);
  }
  _setHeigh = (e) => {
    let heightSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (heightSize > 1000) {
      alert('height의 최대 사이즈는 1000입니다.');
      e.target.value = 1000;
      heightSize = 1000;
    }
    this.props.setHeight(heightSize);
  }
  _setMapList = () => {
    let mapList = this.props.mapList;
    return (mapList.map((type) => {
      return (<div key={type}><input id={type} onClick={this.props.updateMapSet} type='checkbox'></input>{type}</div>)
    }));
  }

  render(){
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>row</td>
            <td><input id='row' onChange={this._setRow} type='number' max='50' defaultValue={this.props.row}></input></td>
          </tr>
          <tr>
            <td>col</td>
            <td><input id='col' onChange={this._setCol} type='number' max='50' defaultValue={this.props.col}></input></td>
          </tr>
          <tr>
            <td>width</td>
            <td><input id='width' onChange={this._setWidth} type='number' max='1000' defaultValue={this.props.width}></input></td>
          </tr>
          <tr>
            <td>height</td>
            <td><input id='height' onChange={this._setHeigh} type='number' max='1000' defaultValue={this.props.height }></input></td>
          </tr>
          <tr>
            <td colSpan='2'>
              <div style={{textAlign: 'center'}}>
                select map chip
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <div className='MenuList'>
                {this._setMapList()}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Menu;