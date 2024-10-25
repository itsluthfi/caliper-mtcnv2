'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class BalanceWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    // Initialize the workload with the parameters needed
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        console.log(`Worker ${this.workerIndex}: Initializing Balance Test`);
    }

    async submitTransaction() {
        // Construct the transaction request for the Balance function
        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'ClientAccountBalance',
            invokerIdentity: 'User1',
            readOnly: true
        };

        await this.sutAdapter.sendRequests(args);
    }
}

function createWorkloadModule() {
    return new BalanceWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;