'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class TransferWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    // Initialize the workload with the parameters needed
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        console.log(`Worker ${this.workerIndex}: Initializing Transfer Test`);

        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'MintTest',
            invokerIdentity: 'User1', 
            contractArguments: ['100000000'],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(args);
    }

    async submitTransaction() {

        const receiver = "eDUwOTo6Q049VXNlcjIsT1U9Y2xpZW50LE89SHlwZXJsZWRnZXIsU1Q9Tm9ydGggQ2Fyb2xpbmEsQz1VUzo6Q049ZmFicmljLWNhLXNlcnZlcixPVT1GYWJyaWMsTz1IeXBlcmxlZGdlcixTVD1Ob3J0aCBDYXJvbGluYSxDPVVT"; // User2 account ID

        // Construct the transaction request for the Transfer function
        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'Transfer',
            invokerIdentity: 'User1', 
            contractArguments: [receiver, '1000'], 
            readOnly: false
        };

        await this.sutAdapter.sendRequests(args);
    }

    async cleanupWorkloadModule() {
        console.log(`Worker ${this.workerIndex}: Transfer test completed`);
    }
}

function createWorkloadModule() {
    return new TransferWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;