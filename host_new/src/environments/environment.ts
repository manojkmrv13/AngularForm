// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//UAT 

export const environment = {
  production: false,
  ApiUrl: 'https://admin.hopetoshine.in/WVI/',
  WebUrl: 'https://www.hopetoshine.in/',
  ApiUrlPdf: 'https://admin.hopetoshine.in',

  CCA_MERCHANTID: '411',
  CCA_ACCESSCODE: 'AVOJ81FK91CE30JOEC',
  CCA_REQUEST_URL: 'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction',
  CCA_ENCRYPTION_KEY: '626FCA3B776D706457BA74AF84F81518',

  CCAFCRA_MERCHANTID: '411',
  CCAFCRA_ACCESSCODE: 'AVOJ81FK91CE30JOEC',
  CCAFCRA_ENCRYPTION_KEY: '626FCA3B776D706457BA74AF84F81518',

  AXIS_ACCESSCODE: 'KMPM5022',
  AXIS_REQUEST_URL: 'https://geniusepay.in/VAS/DCC/do.action',
  AXIS_ENCRYPTION_KEY: '5FCBDE0D45FD4C614EDD4970BA065105',
  AXIS_SECURE_SECRET: '002B56EE2153C809811685575A012D10',

  HDFC_REQUEST_URL: 'oauth/SendPerformREQuest.aspx'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
