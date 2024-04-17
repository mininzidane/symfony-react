import PaymentService from 'frontend/js/api/PaymentService';
import BootstrapService from 'frontend/js/api/BootstrapService';

const INIT_DELAY = 8000;

class SecurePaymentService {
  static ERROR = {
    INVALID_CARD: 'Invalid Card',
    NOT_INITIALIZED: 'Cardinal has not been initialized',
  };

  constructor() {
    this.mpiOrderId = null;
    this.mpiToken = null;
    this.initialized = false;
    this.scriptInitialized = false;
    this.referenceId = null;
    this.amount = null;
    this.globalCmpiLookupPromise = null;
    this.isProduction = BootstrapService.getAppValue('environment') === 'PROD';
    this.dataCollectionPrefix = this.isProduction ? 'centinelapi.cardinalcommerce' : 'centinelapistag.cardinalcommerce';
    this.collectionAttempt = 0;
  }

  async initCardinalScript() {
    return new Promise((resolve, reject) => {
      if (this.scriptInitialized) {
        resolve();
        return;
      }

      if (window.Cardinal) {
        this.Cardinal = window.Cardinal;
        this.scriptInitialized = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = this.isProduction
        ? 'https://songbird.cardinalcommerce.com/cardinalcruise/v1/songbird.js'
        : 'https://songbirdstag.cardinalcommerce.com/cardinalcruise/v1/songbird.js';
      document.head.appendChild(script);
      script.onload = async () => {
        if (!window.Cardinal) {
          reject(new Error('Cardinal is not defined'));
        }
        this.Cardinal = window.Cardinal;
        this.scriptInitialized = true;

        resolve();
      };
    });
  }

  async init({ mpiOrderId, mpiToken, amount }) {
    this.mpiOrderId = mpiOrderId;
    this.mpiToken = mpiToken;
    this.amount = amount;

    this.Cardinal.configure({
      logging: {
        level: this.isProduction ? 'off' : 'on',
      },
    });

    this.Cardinal.setup('init', {
      jwt: this.mpiToken,
    });

    this.Cardinal.on('payments.validated', (data, jwt) => {
      const { resolve, reject } = this.globalCmpiLookupPromise;
      switch (data.ActionCode) {
        case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
        case 'NOACTION': // Handle unenrolled scenario
          resolve({ data, jwt });
          break;

        case 'FAILURE': // Handle authentication failed or error encounter scenario
        case 'ERROR': // Handle service level error
        default:
          reject(new Error(SecurePaymentService.ERROR.INVALID_CARD));
          break;
      }
    });

    window.addEventListener(
      'message',
      (event) => {
        if (event.origin.includes(this.dataCollectionPrefix)) {
          const data = JSON.parse(event.data);
          this.referenceId = data.SessionId;
        }
      },
      false,
    );

    this.initialized = true;
  }

  async update({ mpiOrderId, mpiToken, amount }) {
    if (!this.initialized) {
      throw new Error(SecurePaymentService.ERROR.NOT_INITIALIZED);
    }

    await this.updateJWT(mpiToken);
    this.amount = amount;
    this.mpiOrderId = mpiOrderId;
  }

  async runDataCollection(dataCollectionUrl, jwt) {
    this.collectionAttempt += 1;
    return new Promise((resolve) => {
      const formId = `collectionForm-${this.collectionAttempt}`;

      const form = document.createElement('form');
      form.id = formId;
      form.name = `deviceData-${this.collectionAttempt}`;
      form.method = 'POST';
      form.action = dataCollectionUrl;

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'JWT';
      input.value = jwt;

      form.appendChild(input);

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `document.getElementById('${formId}').submit();`;

      const innerHtml = document.createElement('body');
      innerHtml.appendChild(form);
      innerHtml.appendChild(script);

      const iframe = document.createElement('iframe');
      iframe.id = `cardinalCollector-${this.collectionAttempt}`;
      iframe.width = '10px';
      iframe.height = '10px';
      iframe.style = 'display: none; position: absolute; top: -1000px; left: -1000px;';
      iframe.src = `data:text/html;charset=utf-8,${encodeURI(innerHtml.outerHTML)}`;

      document.body.appendChild(iframe);

      setTimeout(() => resolve(), INIT_DELAY);
    });
  }

  async updateJWT(jwt) {
    this.mpiToken = jwt;
    await this.Cardinal.trigger('jwt.update', jwt);
  }

  getMpiOrderId() {
    return this.mpiOrderId;
  }

  async handleEnrollment(payload) {
    const enrollmentPromise = new Promise((resolve, reject) => {
      this.globalCmpiLookupPromise = { resolve, reject };
    });

    if (!this.initialized) {
      return Promise.reject(new Error(SecurePaymentService.ERROR.NOT_INITIALIZED));
    }

    const postData = {
      ...payload,
      secureReferenceId: this.referenceId,
      mpiOrderId: this.mpiOrderId,
      mpiToken: this.mpiToken,
      amount: this.amount,
    };

    PaymentService.checkEnrollment(postData)
      .then((data) => {
        const { enrollment } = data;
        if (enrollment.success) {
          const acsDetails = enrollment.AcsDetails || {};
          if (Object.keys(acsDetails).length > 0) {
            this.Cardinal.continue('cca', acsDetails, {
              OrderDetails: enrollment.OrderDetails,
            });
          } else {
            this.globalCmpiLookupPromise.resolve({});
          }
        } else {
          this.globalCmpiLookupPromise.reject(new Error(SecurePaymentService.ERROR.INVALID_CARD));
        }

        return data;
      })
      .catch((err) => {
        const isInvalidCard = err.response && err.response.status === 400;
        this.globalCmpiLookupPromise.reject(isInvalidCard ? new Error(SecurePaymentService.ERROR.INVALID_CARD) : err);
      });

    return enrollmentPromise;
  }
}

export default SecurePaymentService;
