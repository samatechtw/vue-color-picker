#!/bin/bash

set -e

node_modules/.bin/vite build
cp ../../README.md dist/
