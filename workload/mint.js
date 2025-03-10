'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MintWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);
        console.log(`Worker ${this.workerIndex}: Initializing Mint Test`);
    }

    async submitTransaction() {
        const amount = '1000';
        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'Mint',
            invokerIdentity: 'User1',
            contractArguments: [amount],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(args);
    }
}

function createWorkloadModule() {
    return new MintWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;