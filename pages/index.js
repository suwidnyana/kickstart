import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
export default class index extends Component {
  static async getInitialProps() {
    const campaign = await factory.methods.getDeployedCampaigns().call();
    return { campaigns: campaign };
  }

  renderCampaigns() {
    console.log(this.props.campaigns.length);
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <h3>
            {this.props.campaigns.length} Campaign Has Been Deployed In This Web
          </h3>
          <Link href="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

//never refresh page just duplicate page
