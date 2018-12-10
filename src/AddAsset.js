import React, {Component} from 'react';
import './AddAsset.css';
import {post} from 'axios';

class AddAsset extends Component {
  state = {assetName: '', assetFile: null}

  _onFormSubmit = (e) => {
    e.preventDefault();

    if (this.state.assetName === '' || this.state.assetName === null) {
      alert('please enter asset name.');
      return;
    }

    if (this.state.assetFile === null) {
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
  console.log();
  const url = '/assets';
  const formData = new FormData();
  formData.append('assetFile', this.state.assetFile);
  formData.append('assetName', this.state.assetName);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return post(url, formData, config);
}

  _setAssetName = (e) => {
    this.setState({assetName: e.target.value});
  }

  _setAssetFile = (e) => {
    this.setState({assetFile: e.target.files[0]});
  }

  render() {
    return (
      <div style={{textAlign: 'center', alignContent:'center' }}>
        <div className='ImageBox'></div>
        <br />
        <div >asset name</div>
        <form onSubmit={this._onFormSubmit}>
          <div>
            <input id='assetName' onChange={this._setAssetName} type='text'></input>
          </div>
          <br/>
          <div>
            <input type='file' onChange={this._setAssetFile} /><button type='submit'>add </button>
          </div>
        </form>
      </div>
    )
  }
}

export default AddAsset;
