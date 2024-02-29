#!/bin/bash

VALIDATOR_BINARY=../../Tracers/hyperlane-monorepo/rust/target/release/validator
VALIDATOR_SIGNATURES_DIR=./state/hyperlane-validator-signatures-osmo

$VALIDATOR_BINARY \
    --db ./state/hyperlane_db_validator_osmo \
    --originChainName osmosis \
    --checkpointSyncer.type localStorage \
    --checkpointSyncer.path $VALIDATOR_SIGNATURES_DIR \
    --validator.key "0x6a9186ed2eaaefea5e275a77ac9d795993d940549ad7657f96527a643a4fce2e"