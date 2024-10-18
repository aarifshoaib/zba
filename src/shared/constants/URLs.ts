import { env } from "../../../env/env.dev";

const URLs = {
 GET_PROJECTS: () => `${env.coreServices}/projects/${env.companyCode}`,
 GET_PCS: () => `${env.coreServices}/pc/${env.companyCode}`,

};

export default URLs;