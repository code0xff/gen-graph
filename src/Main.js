import React, { Component } from 'react';
import Map from './Map';
import Menu from './Menu';

class Main extends Component {
  state = { row: 5, col: 5, width: 300, height: 300}

  _setRow = (rowSize) => {
    this.setState({row: rowSize});
  }
  _setCol = (colSize) => {
    this.setState({col: colSize});
  }
  _setWidth = (widthSize) => {
    this.setState({width: widthSize});
  }
  _setHeight = (heightSize) => {
    this.setState({height: heightSize});
  }
   render() {
    return (
      <div style={{paddingTop: '50px'}}>
        <table style={{margin: 'auto'}}>
          <tbody>
            <tr>
              <td>
                <Map 
                row={this.state.row} 
                col={this.state.col} 
                width={this.state.width}
                height={this.state.height}
                setBlockType={this.props.setBlockType}
                getBlockType={this.props.getBlockType}
                mapSet={this.props.mapSet}
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
                mapList={this.props.mapList}
                updateMapSet={this.props.updateMapSet}
                /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main; 
