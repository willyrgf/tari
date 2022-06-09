use crate::macros::*;

//! Sample template definition
//!
//! Registered code comprises 2 first-class citizens:
//! * Assets - which are _things_ and only hold state.
//!   * They are composable
//!   * Extendable
//! * Operations - which are _verbs_ and are small groups of related functions that
//!   * if read-only, can return a result
//!   * if there are side-effects, Return nothing on success, or an error.
//!   * May take assets and primitives as arguments
//!   * May cause side-effects
//!   * May emit events
//!   * Are atomic
//!   * Can define default authorisation roles, which can be overridden in contract definitions.
//!
//!   Factory operations are able to create new assets (ala constructors)
//!
//! In addition to assets and operations, the template VM
//! * understands the notion of a set of primitive objects (integers, Strings, collection types) that are always copied by value.
//! * provides an [events] API
//! * provides a library of useful crypto functions, signature methods, and Tari blockchain API.
//! * authorisation is handled by means of bearer token (macaroons)
//!
//!
//! Templates are defined in a Rust module using the helper macros [`define_asset!`] and [`define_operations!`].
//!
//! Templates are compiled and packaged into WASM using the Tari helper tools:
//! `cargo tari template package [options] module`
//!
//! Templates have a deterministic hash that is registered on the Tari base layer.
//! `cargo tari template register [options] module`
//! Options include things like where to locate the source (e.g. ipfs / github) and access to a wallet to pay for the
//! registration fees
// ---------------------------------------------    Core Assets    -----------------------------------------------------
/// In the desugaring, the definition
/// * gets converted into a struct named `BaseAsset` (todo: can't concat `Asset` in mock macro. But can in proc macro)
/// * Implements the `TariAsset` marker trait [todo]
/// * Injects WASM bindings so that the struct can be exported [todo]

define_asset!{
    Base {
        assetId: AssetHash
    }
}

define_asset! {
    Named extends Base {
        name: TariString
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

define_operations! {
    NameOperations {
        #[readable]
        #[DefaultAuth(Everyone)]
        fn getName(this: Named) -> TariString {
          Ok(this.name)
        }

        #[writable]
        #[auth(Roles: [SET_NAME])]
        fn setName(this: Named, newName: TariString) {
            this.name = newName;
            emit!("{} name change to {}", this.assetId, this.owner);
        }
    }
}

/// In the de-sugaring, the action definition gets injected into a struct, `OwnerOperationTemplate`.
/// * The marker trait `TariOperation` is implemented on it
/// * WASM bindings for the action are created.
/// For each function definition, a function ABI definition is constructed so that
/// * `callReadable("getOwner", Auth::default())`
/// * `callWritable("setOwner", myAuth, newOwnerPubkey)`
/// are registered on the underlying operation template definition
define_operations! {
    OwnerOperations {
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
        tokenId: TariInteger;
        properties: Bitmask;
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