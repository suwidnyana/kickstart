import { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  state = {};
  render() {
    return (
      <Layout>
        <h3>Requests Lists</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
