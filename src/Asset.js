import React, { Component } from 'react';
import AddAsset from './AddAsset';
import AssetList from './AssetList';

class Asset extends Component {
  render() {
    return (
      <div style={{paddingTop: '50px'}}>
        <table style={{margin: 'auto'}}>
          <tbody>
            <tr>
              <td>
                <AddAsset 
                reloadMapList={this.props.reloadMapList}
                />
              </td>
              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
              <td>
                <AssetList 
                mapList={this.props.mapList}
                mapSetList={this.props.mapSetList}
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
