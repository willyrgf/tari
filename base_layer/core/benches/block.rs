//  Copyright 2022. The Tari Project
//
//  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
//  following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
//  disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
//  following disclaimer in the documentation and/or other materials provided with the distribution.
//
//  3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
//  products derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
//  INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
//  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
//  USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#[cfg(not(feature = "benches"))]
mod benches {
    pub fn main() {
        println!("Enable the `benches` feature to run benches");
    }
}

#[cfg(feature = "benches")]
mod benches {

    use criterion::{criterion_group, Criterion};
    use tari_common::configuration::Network;
    use tari_core::{
        consensus::ConsensusManager,
        mempool::{Mempool, MempoolConfig},
        test_helpers::blockchain::create_new_blockchain,
        transactions::{
            tari_amount::{uT, T},
            transaction_components::{OutputFeatures, Transaction, MAX_TRANSACTION_OUTPUTS},
            CryptoFactories,
        },
        tx,
        validation::transaction_validators::{
            MempoolValidator,
            TxConsensusValidator,
            TxInputAndMaturityValidator,
            TxInternalConsistencyValidator,
        },
    };
    use tokio::{runtime::Runtime, task};

    pub fn empty_block_perf_test(c: &mut Criterion) {
        let runtime = Runtime::new().unwrap();
        let config = MempoolConfig::default();
        let rules = ConsensusManager::builder(Network::LocalNet).build();
        let db = create_new_blockchain();
    }
}
