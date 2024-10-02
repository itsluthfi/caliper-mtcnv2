'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MintWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    // Initialize the workload with the parameters needed
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        console.log(`Worker ${this.workerIndex}: Initializing Mint Test with amount ${this.roundArguments.amount}`);
    }

    async submitTransaction() {
        const amountToMint = this.roundArguments.amount;

        // Construct the transaction request for the Mint function
        const args = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'Mint',
            invokerIdentity: 'caliper', 
            contractArguments: [amountToMint.toString()], 
            readOnly: false
        };

        await this.sutAdapter.sendRequests(args);
    }

    async cleanupWorkloadModule() {
        console.log(`Worker ${this.workerIndex}: Mint test completed`);
    }
}

function createWorkloadModule() {
    return new MyMintWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;