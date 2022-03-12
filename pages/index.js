import React, { Component } from 'react';
import factory from '../ethereum/factory';
export default class index extends Component {
  async componentDidMount() {
    const campaign = await factory.methods.getDeployedCampaigns().call();
    console.log(campaign);
  }
  render() {
    return <div>index</div>;
  }
}
