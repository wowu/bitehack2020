#!/bin/bash

cd ../frontend
npm run build
cp -r build/* ../backend/public
cd ../backend
