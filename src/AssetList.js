import React, {Component} from 'react';
import './AssetList.css';
import axios from 'axios';

class AssetList extends Component {
  _selectType = (e) => {
    this.props.setImageSource('/images/' + this.props.mapSetList[e.target.id] + '.jpg');
  }

  deleteList = [];
  _checkDeleteType = (e) => {
    if (e.target.checked) {
      this.deleteList.push(e.target.id);
    } else {
      let index = this.deleteList.indexOf(e.target.id);
      this.deleteList.splice(index, 1);
    }
  }

  _deleteMapChip = () => {
    axios.delete('/assets', {data: {deleteList: this.deleteList}})
    .then(res => {
      if (res.data.result === 'success') {
        this.props.reloadMapList();
        this.deleteList = [];
        alert('success');
      }
    })
    .catch(err => {console.log(err)});
  }
  
  _showMapList = () => {
    let mapList = this.props.mapList;
    return (mapList.map((type) => {
      return <div className='AssetListContent' id={type} key={type} onClick={this._selectType}>
      <input id={type} type='checkbox' onClick={this._checkDeleteType}></input>
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
        <br/>
        <button style={{width: '200px'}} onClick={this._deleteMapChip}>delete</button>
      </div>
    )
  }
}

export default AssetList;
