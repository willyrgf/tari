use crate::macros::*;

// ---------------------------------------------    Core Assets    -----------------------------------------------------
/// In the desugaring, the definition
/// * gets converted into a struct named `BaseAsset` (todo: can't concat `Asset` in mock macro. But can in proc macro)
/// * Implements the `TariAsset` marker trait [todo]
/// * Injects WASM bindings so that the struct can be exported [todo]

define_asset!{
    Base {
        assetId: Hash256
    }
}

define_asset! {
    Named extends Base {
        name: String256
    }
}

define_asset! {
    Owned extends Base {
        owner: PublicKey
    }
}

define_asset! {
    HomogeneousCollection extends Base {
        items: Vec //  Vec<T> where T:Base
    }
}
// ---------------------------------------------   Core Actions    -----------------------------------------------------

define_action! {
    Name {
        #[readable]
        #[auth(None)]
        fn getName(this: Named) -> String {
          Ok(this.name)
        }

        #[writable]
        #[auth(Roles: [SET_NAME])]
        fn setName(this: Named, newName: String) {
            this.name = newName;
            emit!("{} name change to {}", this.assetId, this.owner);
        }
    }
}

/// In the desugaring, the action defintion gets converted into a struct, `OwnerAction`.
/// * The marker trait `TariAction` is implemented on it (todo: can't concat `Asset` in mock macro. But can in proc macro)
/// * WASM bindings for the action are created.
/// For each function definition, a function ABI definition is constructed so that
/// * `callReadable("getOwner", Auth::default())`
/// * `callWritable("setOwner", myAuth, newOwnerPubkey)`
/// are registered on the underlying action definition
define_action! {
    Owner {
        #[readable]
        #[auth(None)]
        fn getOwner(this: Owned) -> PublicKey {
          Ok(this.owner)
        }

        #[writable]
        #[auth(Roles: [SET_OWNER])]
        fn setOwner(this: Owned, new_owner: PublicKey) -> () {{
            this.owner = new_owner;
            emit!("{} owner change to {}", this.assetId, this.owner);
        }}

        #[writable]
        #[auth(Roles: [SET_OWNER])]
        fn burn(this: Owned) -> () {{
            assert!(auth.signer() == this.owner); // the auth variable is injected into the generated code. Only owner can burn
            this.owner = PublicKey::default();
            emit!("{} burned", this.assetId);
        }}
    }
}

// ---------------------------------------------     Examples      -----------------------------------------------------
// --------------------------------------------- ERC-721 recipe    -----------------------------------------------------

define_asset! {
    NonFungibleToken extends Base, Owned  {{
        tokenId: u64;
        properties: u8;
    }}
}


/// Recipes are run on side-chains and require a contract definition
/// ```json
///  {
///   "name": "MyNFT",
///   "assets": {
///     "title": Named,
///     "collection": {
///        "type": "HomogeneousCollection",
///        "items": {
///            "type": "NonFungibleToken"
///        }
///     }
///   },
///   actions: [
///     {
///        "action": "Name",
///        "initialization": {
///           "on": "title",
///           "arguments": { "name": "Bore Dapes" },
///        }
///     },
///     {
///        "action": "Owner",
///        "initialization": {
///           "on": "collection",
///           "arguments": { "owner": "canbed04e..." },
///        }
///     }
///   ]
/// }
/// ```
mod examples {}