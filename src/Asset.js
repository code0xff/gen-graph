import React, { Component } from 'react';
import AddAsset from './AddAsset';
import AssetList from './AssetList';

class Asset extends Component {
  state = {assetName: '', assetFile: null, imageSource: ''}

  _setAssetName = (e) => {
    this.setState({assetName: e.target.value});
  }

  _setAssetFile = (e) => {
    this.setState({assetFile: e.target.files[0]});

    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = (e) => { 
      this._setImageSource(e.target.result);
    }
  }
  _setImageSource = (source) => {
    this.setState({imageSource: source});
  }

  render() {
    return (
      <div style={{paddingTop: '50px'}}>
        <table style={{margin: 'auto'}}>
          <tbody>
            <tr>
              <td>
                <AddAsset 
                reloadMapList={this.props.reloadMapList}
                assetName={this.state.assetName}
                assetFile={this.state.assetFile}
                imageSource={this.state.imageSource}
                setAssetName={this._setAssetName}
                setAssetFile={this._setAssetFile}
                />
              </td>
              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
              <td>
                <AssetList 
                reloadMapList={this.props.reloadMapList}
                mapList={this.props.mapList}
                mapSetList={this.props.mapSetList}
                setImageSource={this._setImageSource}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Asset;
