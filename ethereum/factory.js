import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0xdc89d37e1f76f3c9e8466c595f301c62763227a0'
);

export default instance;
