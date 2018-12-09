import React, {Component} from 'react';
import './AssetList.css';

class AssetList extends Component {
  _showMapList = () => {
    let mapList = this.props.mapList;

    return (mapList.map((type) => {
      return <div key={type}>
      <img alt={type} className='mapListImage' src={'/images/' + this.props.mapSetList[type] + '.jpg'}></img>&nbsp;
      {type}</div>;
    }));
  }

  render() {
    return (
      <div>
        <div className='AssetList'>
          {this._showMapList()}
        </div>
      </div>
    )
  }
}

export default AssetList;