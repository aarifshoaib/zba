import moment from "moment";

export class Metadata {
    platform: string;
    serviceName: string;
    mongoReferenceNumber: string;
    isProcessed: boolean;
    application: string;

    constructor(platform, serviceName,application) {
        this.platform = platform;
        this.serviceName = serviceName;
        this.mongoReferenceNumber = `REF-${serviceName}-${moment(new Date()).format('ssmmHHDDMMYY')}`;
        this.application = application;
    }
}