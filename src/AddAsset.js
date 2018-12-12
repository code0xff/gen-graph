import React, {Component} from 'react';
import './AddAsset.css';
import {post} from 'axios';

class AddAsset extends Component {
  _onFormSubmit = (e) => {
    e.preventDefault();

    if (this.props.assetName === '' || this.props.assetName === null) {
      alert('please enter asset name.');
      return;
    }

    if (this.props.assetFile === null) {
      alert('please register file.');
      return;
    }

    this._fileUpload()
    .then((response)=>{
      if(response.data.result === 'success') {
        this.props.reloadMapList();
        alert('success!');
      } else {

      }
    });
}

  _fileUpload = () => {
    const url = '/assets/upload';
    const formData = new FormData();
    formData.append('assetFile', this.props.assetFile);
    formData.append('assetName', this.props.assetName);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  _setAssetImage = () => {
    return <img alt='empty' className='Preview' src={this.props.imageSource === '' ? '/images/empty.jpg' : this.props.imageSource}></img>
  }

  render() {
    return (
      <div style={{textAlign: 'center', alignContent:'center' }}>
        <div className='ImageBox'>
          {this._setAssetImage()}
        </div>
        <br />
        <div >asset name</div>
        <form onSubmit={this._onFormSubmit}>
          <div>
            <input id='assetName' onChange={this.props.setAssetName} type='text'></input>
          </div>
          <br/>
          <div>
            <input type='file' onChange={this.props.setAssetFile} /><button type='submit'>add </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddAsset;
