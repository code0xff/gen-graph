import React, {Component} from 'react';
import './AssetList.css';
import axios from 'axios';
import PropTypes from 'prop-types';

class AssetList extends Component {
  static propTypes = {
    reloadMapList: PropTypes.func.isRequired,
    mapList: PropTypes.array.isRequired,
    mapSetList: PropTypes.object.isRequired,
    setImageSource: PropTypes.func.isRequired
  }

  _selectType = (e) => {
    this.props.setImageSource('/images/' + this.props.mapSetList[this.props.mapList[e.target.id]] + '.jpg');
  }

  deleteList = [];
  _checkDeleteType = (e) => {
    if (e.target.checked) {
      this.deleteList.push(this.props.mapList[e.target.id]);
    } else {
      let index = this.deleteList.indexOf(this.props.mapList[e.target.id]);
      this.deleteList.splice(index, 1);
    }
  }

  _deleteMapChip = () => {
    if (this.deleteList.length === 0) {
      alert('please select map chip');
      return;
    }

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
    return (mapList.map((type, index) => {
      return <div className='AssetListContent' id={index} key={type} onClick={this._selectType}>
      <input id={index} type='checkbox' onClick={this._checkDeleteType}></input>
      <img id={index} alt={type} className='MapListImage' src={'/images/' + this.props.mapSetList[type] + '.jpg'}></img>&nbsp;
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
