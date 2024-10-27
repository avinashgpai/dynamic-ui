// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getAllClientCodes: 'http://10.81.164.85:20010/api/one-board/v2/getAllClientCodes?product={{product}}',
  searchExtensions: 'http://10.81.164.85:20010/api/one-board/v2/extensions/search/{{client}}/{{product}}?page={{page}}&size={{size}}',
  saveProjectData: 'http://10.81.164.85:20010/api/ext/Oneboard/V2/saveProjectData',
  saveExtensionData: 'http://10.81.164.85:20010/api/one-board/v2/saveExtensionData',
  updateExtensionData: 'http://10.81.164.85:20010/api/one-board/v2/updateExtension',
  getExtensionData: 'http://10.81.164.85:20010/api/one-board/v2/getExtensionDetails',
  getExtensionOverviewData: 'http://10.81.164.85:20010/api/one-board/v2/getAllExtensionData',
  getTableData: 'http://10.81.164.85:20010/api/one-board/v2/extensions/find?page={{page}}&size={{size}}',
  updateEstimationStatus: 'http://10.81.164.85:20010/api/one-board/v2/status/update',
  saveEstimationData: 'http://10.81.164.85:20010/api/one-board/v2/estimation/saveEstimations',
  getEstimationData: 'http://10.81.164.85:20010/api/one-board/v2/estimation/getEstimations?extNo={{extNo}}&productCode={{product}}&clientCode={{client}}',
  getAllStdEffortDetails: 'http://10.81.164.85:20010/api/one-board/v2/estimation/findAllDetails',
  getProjectData: 'http://10.81.164.85:20010/api/ext/Oneboard/V2/getProjectData',
  updateProjectData: 'http://10.81.164.85:20010/api/ext/Oneboard/V2/updateProjectData',
  fetchExtensionForProject: 'http://10.81.164.85:20010/api/one-board/v2/fetchDataForPorting',
  getEstimationHistory: 'http://10.81.164.85:20010/api/one-board/v2/estimation/getLOEHistory',
  getAllDashboardChartConfig: 'http://10.81.164.85:20010/api/one-board/v2/dashboard/configurations',
  saveDashboardChartConfig: 'http://10.81.164.85:20010/api/one-board/v2/dashboard/configuration/save',
  getAllComponentDetails: 'http://10.81.164.85:20010/api/one-board/v2/functionalArea/getAllComponentDetails/{{product}}',
  searchExtensionElastic: 'http://10.81.164.85:20010/api/search/doc/adv/search/extensionmaster?size={{size}}&page={{page}}',
  getDashboardChart: 'http://10.81.164.85:20010/api/one-board/v2/dashboard/getDashboardChart',
  authenticate: 'http://10.81.164.85:20010/api/one-board/login/authenticate',
  getGapHoursSizingMetric: 'http://10.81.164.85:20010/api/one-board/v2/findSizeOfExtension/{{product}}',
  getApprovalEmails: 'http://10.81.164.85:20010/api/one-board/v2/getEmailsForProject/{{product}}/{{client}}',
  saveHLETemplatePlan: 'http://10.81.164.85:20010/api/one-board/v2/plan/saveHLETemplatePlan',
  getUniquePlansByProduct: 'http://10.81.164.85:20010/api/one-board/v2/plan/getUniquePlansByProduct?product={{product}}',
  getHLETemplateByProductByPlan: 'http://10.81.164.85:20010/api/one-board/v2/plan/getHLETemplateByProductByPlan?product={{product}}&planId={{planId}}',
  getUniqueCustomersHavePlan: 'http://10.81.164.85:20010/api/one-board/v2/plan/getUniqueCustomersHavePlan?product={{product}}',
  saveHLEPlan: 'http://10.81.164.85:20010/api/one-board/v2/plan/saveHLEPlan',
  getPlansByProductByClient: 'http://10.81.164.85:20010/api/one-board/v2/plan/getPlansByProductByClient?product={{product}}&client={{client}}',
  sendEmailAlert: 'http://10.81.164.85:20010/api/one-board/alert/emailAlert',
  getDashboardChartFilter: 'http://10.81.164.85:20010/api/one-board/v2/dashboard/getDashboardChartFilter?chartId={{chartId}}',
  getBaseEffortForExtension: 'http://10.81.164.85:20010/api/one-board/v2/plan/getTemplateByCustomer?product={{product}}&client={{client}}',
  saveEmail: 'http://10.81.164.85:20010/api/one-board/v2/email/save',
  checkIsApprover: 'http://10.81.164.85:20010/api/one-board/v2/email/isApprover?product={{product}}&client={{client}}&email={{email}}',
  deleteEmail: 'http://10.81.164.85:20010/api/one-board/v2/email/removeEmail?product={{product}}&client={{client}}&email={{email}}&role={{role}}'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
