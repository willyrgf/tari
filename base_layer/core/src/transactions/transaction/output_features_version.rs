use std::convert::TryFrom;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Hash, PartialEq, Deserialize, Serialize, Eq)]
#[repr(u8)]
pub enum OutputFeaturesVersion {
    V0 = 0,
}

impl OutputFeaturesVersion {
    pub fn get_current_version() -> Self {
        Self::V0
    }
}

impl TryFrom<u8> for OutputFeaturesVersion {
    type Error = String;

    fn try_from(value: u8) -> Result<Self, Self::Error> {
        match value {
            0 => Ok(OutputFeaturesVersion::V0),
            _ => Err("Unknown version!".to_string()),
        }
    }
}