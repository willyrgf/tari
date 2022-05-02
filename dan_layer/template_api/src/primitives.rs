// Generally mock instances for now
pub struct Hash256([u8; 32]);
pub struct PublicKey([u8; 32]);
pub struct String256(String);

pub enum Value {
    Hash256(Hash256),
    PublicKey(PublicKey),
    String256(String256),
}