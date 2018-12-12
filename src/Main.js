import React, { Component } from 'react';
import Map from './Map';
import Menu from './Menu';

class Main extends Component {
  render() {
    return (
      <div style={{paddingTop: '50px'}}>
        <table style={{margin: 'auto'}}>
          <tbody>
            <tr>
              <td>
                <Map 
                row={this.props.row} 
                col={this.props.col} 
                width={this.props.width}
                height={this.props.height}
                setBlockType={this.props.setBlockType}
                getBlockType={this.props.getBlockType}
                mode={this.props.mode}
                />
              </td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td><Menu
                row={this.props.row} 
                col={this.props.col} 
                width={this.props.width}
                height={this.props.height}
                setRow={this.props.setRow}
                setCol={this.props.setCol}
                setWidth={this.props.setWidth}
                setHeight={this.props.setHeight}
                mapList={this.props.mapList}
                mapSetList={this.props.mapSetList}
                updateMapSet={this.props.updateMapSet}
                selectedMapSet={this.props.selectedMapSet}
                mode={this.props.mode}
                setMode={this.props.setMode}
                /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main; 
