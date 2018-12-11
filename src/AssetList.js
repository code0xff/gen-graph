import React, {Component} from 'react';
import './AssetList.css';

class AssetList extends Component {
  _selectType = (e) => {
    this.props.setImageSource('/images/' + this.props.mapSetList[e.target.id] + '.jpg');
  }
  
  _showMapList = () => {
    let mapList = this.props.mapList;
    return (mapList.map((type) => {
      return <div className='AssetListContent' id={type} key={type} onClick={this._selectType}>
      <img alt={type} className='MapListImage' src={'/images/' + this.props.mapSetList[type] + '.jpg'}></img>&nbsp;
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
