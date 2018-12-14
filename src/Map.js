import React, { Component } from 'react';
import './Map.css';

class Map extends Component {
  _createFrame = () => {
    let cols = [];
    for (let i = 1; i <= this.props.col; i++) {
      cols.push(i);
    }
    let rows = [];
    for (let i = 1; i <= this.props.row; i++) {
      rows.push(i);
    }
    return rows.map((rowIndex) => {
      let blocks = cols.map((colIndex) => {
        let id = (rowIndex < 10 ? '0' + rowIndex : rowIndex) + '' + (colIndex < 10 ? '0' + colIndex : colIndex);
        return <td className='Block'
        onClick={this.props.mode === 'click' ? this.props.setBlockType : null}
        onMouseOver={this.props.mode === 'over' ? this.props.setBlockType : null}
        key={id} id={id} 
        style={{width: parseInt(this.props.width / this.props.col) + 'px',
                height: parseInt(this.props.height / this.props.row) + 'px',
                borderWidth: this.props.line + 'px',
                paddingRight: this.props.collapse === 'collapse' ? '0px' : '1px'
              }}
        background={'/images/' + this.props.getTypeImage(id) + '.jpg'}
        >
        </td>});

      return (<tr key={rowIndex} id={rowIndex}>{blocks}</tr>)
    });
  }

  render() {
    return (
      <div>
        <table 
        style={{borderCollapse: this.props.collapse}}>
          <thead></thead>
          <tbody>
            {this._createFrame()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Map;
