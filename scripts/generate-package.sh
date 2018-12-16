#!/usr/bin/env bash
set -e

PACKAGE_DIR=packages
PACKAGE_TEMPLATE_DIR=scripts/templates/package

# If no args are supplied, ask for user input
if [[ $# -eq 0 ]]; then
  read -p 'Package type name: ' type
  read -p 'Package name: ' package
else
  packageType=$1
  package=$1
fi

export PACKAGE_TYPE=${packageType}
export PACKAGE=${package}
export VERSION=$(node -p "require('./lerna').version")

if [[ ! -d "$PACKAGE_DIR" ]]; then
  echo Cannot find component directory!
  exit 1
fi

if [[ ! -d "$PACKAGE_TEMPLATE_DIR" ]]; then
  echo Cannot find package template!
  exit 1
fi

if [[ -d "${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE}" ]]; then
  echo Oops! Package ${PACKAGE} exists!
  exit 1
fi

echo Generating ${PACKAGE} files in ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE}

cp -r ${PACKAGE_TEMPLATE_DIR} ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE}

# Update file names
find ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE} -name 'Package*' -type f -exec bash -c 'mv "$1" "${1/Package/$PACKAGE}"' -- {} \;

# Update file contents
if [[ "$OSTYPE" == darwin* ]]; then
  find ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE} -type f -exec sed -i '' "s/\${PACKAGE}/$PACKAGE/g" '{}' \;
else
  find ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE} -type f -exec sed -i -e "s/\${PACKAGE}/$PACKAGE/g" '{}' \;
fi

if [[ "$OSTYPE" == darwin* ]]; then
  find ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE} -type f -exec sed -i '' "s/\${VERSION}/$VERSION/g" '{}' \;
else
  find ${PACKAGE_DIR}/${PACKAGE_TYPE}/${PACKAGE} -type f -exec sed -i -e "s/\${VERSION}/$VERSION/g" '{}' \;
fi
