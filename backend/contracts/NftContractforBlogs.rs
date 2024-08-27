
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec, Map, Duration};

#[contract]
pub struct BlogNftContract;

#[contractimpl]
impl BlogNftContract {
    pub fn upvote_blog(env: Env, blog_id: Symbol) {
        let mut upvotes: Map<Symbol, u64> = env.storage().get(&symbol_short!("upvotes")).unwrap_or_default();
        let count = upvotes.get(&blog_id).unwrap_or(0) + 1;
        upvotes.set(blog_id, count);
        env.storage().set(&symbol_short!("upvotes"), &upvotes);
    }

    pub fn reward_top_blog(env: Env) -> Symbol {
        let upvotes: Map<Symbol, u64> = env.storage().get(&symbol_short!("upvotes")).unwrap_or_default();
        let mut top_blog = Symbol::default();
        let mut max_upvotes = 0;

        for (blog_id, count) in upvotes.iter() {
            if count > max_upvotes {
                max_upvotes = count;
                top_blog = blog_id;
            }
        }

        if max_upvotes > 0 {
            // Mint NFT for the top blog
            // Logic to mint NFT
            env.storage().set(&symbol_short!("last_reward_time"), &env.block().timestamp());
            return top_blog;
        }

        Symbol::default()
    }

    pub fn check_and_reward(env: Env) {
        let last_reward_time: u64 = env.storage().get(&symbol_short!("last_reward_time")).unwrap_or(0);
        if env.block().timestamp() - last_reward_time >= Duration::days(7).as_secs() {
            Self::reward_top_blog(env);
        }
    }
}
