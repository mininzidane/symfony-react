import BootstrapService from 'frontend/js/api/BootstrapService';
import BaseApiService from '../BaseApiService';

class BuyerPowerService extends BaseApiService {}

BuyerPowerService.depositToBuyerPowerRatio = 10;
BuyerPowerService.minDepositAmount = BootstrapService.getAppValue('minDeposit');
BuyerPowerService.minDepositThreshold = BuyerPowerService.minDepositAmount * BuyerPowerService.depositToBuyerPowerRatio;

export default BuyerPowerService;
