import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  compiledFactory.abi,
  '0x1547dCcaDFbC675e7df9c209ac868b26f174a07D'
);

export default instance;
