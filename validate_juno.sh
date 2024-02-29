#!/bin/bash

CONFIG_FILES=scripts/context/JUNO.json
VALIDATOR_BINARY=../../Tracers/hyperlane-monorepo/rust/target/release/validator
VALIDATOR_SIGNATURES_DIR=./state/hyperlane-validator-signatures-juno

$VALIDATOR_BINARY \
    --db ./state/hyperlane_db_validator_juno \
    --originChainName juno \
    --checkpointSyncer.type localStorage \
    --checkpointSyncer.path $VALIDATOR_SIGNATURES_DIR \
    --validator.key 0xa116c37c7a1831f0e3bb4e62e3beee1b9ab82abe7936cd98f6a09d4be05c1b32