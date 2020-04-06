CREATE TABLE stored_messages (
   id INTEGER NOT NULL PRIMARY KEY,
   version INT NOT NULL,
   origin_pubkey TEXT NOT NULL,
   origin_signature TEXT NOT NULL,
   message_type INT NOT NULL,
   destination_pubkey TEXT,
   destination_node_id TEXT,
   header BLOB  NOT NULL,
   body BLOB  NOT NULL,
   is_encrypted BOOLEAN NOT NULL CHECK (is_encrypted IN (0,1)),
   priority INT NOT NULL,
   stored_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stored_messages_destination_pubkey ON stored_messages (destination_pubkey);
CREATE INDEX idx_stored_messages_destination_node_id ON stored_messages (destination_node_id);
CREATE INDEX idx_stored_messages_stored_at ON stored_messages (stored_at);
CREATE INDEX idx_stored_messages_priority ON stored_messages (priority);

CREATE TABLE dht_settings (
    id INTEGER PRIMARY KEY NOT NULL,
    key TEXT NOT NULL,
    value BLOB NOT NULL
);

CREATE UNIQUE INDEX idx_dht_settings_key ON dht_settings (key);
