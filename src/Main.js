import React, { Component } from 'react';
import Map from './Map';
import Menu from './Menu';

class Main extends Component {
  state = { row: 5, col: 5, width: 300, height: 300}

  _setRow = (e) => {
    let rowSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (rowSize > 50) {
      alert('row의 최대 사이즈는 50입니다.');
      rowSize = 50;
    }
    this.setState({row: rowSize});
  }
  _setCol = (e) => {
    let colSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (colSize > 50) {
      alert('column의 최대 사이즈는 50입니다.');
      colSize = 50;
    }
    this.setState({col: colSize});
  }
  _setWidth = (e) => {
    let widthSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (widthSize > 1000) {
      alert('width의 최대 사이즈는 1000입니다.');
      widthSize = 1000;
    }
    this.setState({width: widthSize});
  }
  _setHeight = (e) => {
    let heightSize = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (heightSize > 1000) {
      alert('height의 최대 사이즈는 1000입니다.');
      heightSize = 1000;
    }
    this.setState({height: heightSize});
  }
   render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <Map 
                row={this.state.row} 
                col={this.state.col} 
                width={this.state.width}
                height={this.state.height}
                />
              </td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td><Menu
                row={this.state.row} 
                col={this.state.col} 
                width={this.state.width}
                height={this.state.height}
                border={this.state.border}
                setRow={this._setRow}
                setCol={this._setCol}
                setWidth={this._setWidth}
                setHeight={this._setHeight}
                /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main; 