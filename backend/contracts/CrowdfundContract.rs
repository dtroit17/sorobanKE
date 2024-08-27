
// This contract allows users to vote on crowdfunding proposals and rewards NFTs which are redeemable.

#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec, Map};

#[contract]
pub struct CrowdfundContract;

#[contractimpl]
impl CrowdfundContract {
    pub fn create_proposal(env: Env, creator: Symbol, goal: u64) -> Symbol {
        let proposal_id = env.block().timestamp().to_string();
        let mut proposals: Map<Symbol, (Symbol, u64, u64)> = env.storage().get(&symbol_short!("proposals")).unwrap_or_default();
        proposals.set(proposal_id.clone(), (creator, goal, 0));
        env.storage().set(&symbol_short!("proposals"), &proposals);
        Symbol::from(proposal_id)
    }

    pub fn vote_proposal(env: Env, proposal_id: Symbol, voter: Symbol) {
        let mut votes: Map<Symbol, Vec<Symbol>> = env.storage().get(&symbol_short!("votes")).unwrap_or_default();
        let mut proposal_votes = votes.get(&proposal_id).unwrap_or_default();
        proposal_votes.push(voter);
        votes.set(proposal_id, proposal_votes);
        env.storage().set(&symbol_short!("votes"), &votes);
    }

    pub fn reward_proposal(env: Env, proposal_id: Symbol) -> Symbol {
        let votes: Map<Symbol, Vec<Symbol>> = env.storage().get(&symbol_short!("votes")).unwrap_or_default();
        let proposal_votes = votes.get(&proposal_id).unwrap_or_default();

        if proposal_votes.len() > 0 {
            // Mint NFT for the proposal
            // Logic to mint NFT
            return proposal_id;
        }

        Symbol::default()
    }
}
