import React, { Component } from 'react';
import Map from './Map';
import Menu from './Menu';
import PropTypes from 'prop-types';

class Main extends Component {
  static propTypes = {
    row: PropTypes.number.isRequired, 
    col: PropTypes.number.isRequired, 
    width: PropTypes.number.isRequired, 
    height: PropTypes.number.isRequired, 
    setBlockType: PropTypes.func.isRequired, 
    getTypeImage: PropTypes.func.isRequired, 
    mode: PropTypes.string.isRequired, 
    collapse: PropTypes.string.isRequired, 
    line: PropTypes.number.isRequired, 
    setRow: PropTypes.func.isRequired, 
    setCol: PropTypes.func.isRequired, 
    setWidth: PropTypes.func.isRequired, 
    setHeight: PropTypes.func.isRequired, 
    mapList: PropTypes.array.isRequired, 
    mapSetList: PropTypes.object.isRequired, 
    updateMapSet: PropTypes.func.isRequired, 
    selectedMapSet: PropTypes.string.isRequired, 
    setMode: PropTypes.func.isRequired, 
    initialize: PropTypes.func.isRequired, 
    saveMap: PropTypes.func.isRequired, 
    loadMap: PropTypes.func.isRequired, 
    onOffCollapse: PropTypes.func.isRequired, 
    onOffLine: PropTypes.func.isRequired, 
    editMapChipOrder:  PropTypes.func.isRequired
  }

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
                getTypeImage={this.props.getTypeImage}
                mode={this.props.mode}
                collapse={this.props.collapse}
                line={this.props.line}
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
                initialize={this.props.initialize}
                saveMap={this.props.saveMap}
                loadMap={this.props.loadMap}
                onOffCollapse={this.props.onOffCollapse}
                onOffLine={this.props.onOffLine}
                collapse={this.props.collapse}
                line={this.props.line}
                editMapChipOrder={this.props.editMapChipOrder}
                /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Main; 
