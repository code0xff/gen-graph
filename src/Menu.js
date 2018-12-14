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
    return (this.props.mapList.map((type) => {
      return (
      <div className='MapSetContent'
      key={type} 
      id={type} 
      onClick={this.props.updateMapSet}
      >
      <img alt={type} 
      id={type}
      className='MapListImage' 
      src={'/images/' + this.props.mapSetList[type] + '.jpg'}></img>&nbsp;
      {type}</div>)
    }));
  }

  _initialize = () => {
    if (window.confirm('If you want to clear map, please click yes. it needs few minutes...')) {
      this.props.initialize();
    }
  }

  render(){
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>row</td>
            <td><input className='Input' id='row' onChange={this._setRow} type='number' max='50' defaultValue={this.props.row}></input></td>
            <td>col</td>
            <td><input className='Input' id='col' onChange={this._setCol} type='number' max='50' defaultValue={this.props.col}></input></td>
          </tr>
          <tr>
            <td>width</td>
            <td><input className='Input' id='width' onChange={this._setWidth} type='number' max='1000' defaultValue={this.props.width}></input></td>
            <td>height</td>
            <td><input className='Input' id='height' onChange={this._setHeigh} type='number' max='1000' defaultValue={this.props.height }></input></td>
          </tr>
          <tr>
            <td>collapse</td>
            <td>
              <input type='checkbox' 
              onClick={this.props.onOffCollapse} 
              defaultChecked={this.props.collapse === 'collapse' ? 'checked' : ''}>
              </input></td>
            <td>line off</td>
            <td><input 
            type='checkbox' 
            onClick={this.props.onOffLine}
            defaultChecked={this.props.line === 0 ? 'checked' : ''}>
            </input></td>
          </tr>
          <tr>
            <td colSpan='4'>
              <div style={{textAlign: 'center'}}>
                map chip
                &nbsp;
                <img 
                alt='seleted' 
                className='MapListImage' 
                src={'/images/' + this.props.mapSetList[this.props.selectedMapSet] + '.jpg'}/>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan='4'>
              <div className='MenuList'>
                {this._setMapList()}
              </div>
              <button id='up' className='Updown' onClick={this.props.editMapChipOrder}>up</button>
              <button id='down' className='Updown' onClick={this.props.editMapChipOrder}>down</button>
            </td>
          </tr>
          <tr>
            <td colSpan='4'>
              <div style={{textAlign: 'center'}}>
                edit mode
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan='4'>
              <div className='ModeList' style={{}}>
                <input 
                type='radio' 
                name='mode' 
                value='click' 
                onClick={this.props.setMode}
                defaultChecked={this.props.mode === 'click' ? 'checked':''}/>click
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input 
                type='radio' 
                name='mode' 
                value='over' 
                onClick={this.props.setMode}
                defaultChecked={this.props.mode === 'over' ? 'checked':''}
                />over
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan='4'>
            <button onClick={this._initialize}>clear</button>
            &nbsp;&nbsp;
            <button onClick={this.props.saveMap}>save</button>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Menu;
