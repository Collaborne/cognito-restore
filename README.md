# cognito-restore [![Build Status](https://travis-ci.org/Collaborne/cognito-restore.svg?branch=master)](https://travis-ci.org/Collaborne/cognito-restore)

This is a tool that can help restore users from a [cognito-backup](https://www.npmjs.com/package/cognito-backup) JSON file.

## Installation

```sh
npm install -g cognito-restore
```

## Usage

```sh
AWS_PROFILE=... AWS_REGION=... cognito-backup backup-users OLD_USERPOOL_ID --file export.json
cognito-restore map --header header.csv [--attribute name=value...] export.json > users.csv
```

This will produce `users.csv` by mapping all data from `export.json` into the structure defined by `header.csv`. The `--attribute` argument
can be provided to inject additional fixed values into the CSV.

The file `users.csv` can then be imported using the AWS Cognito Console.

_FIXME: Describe how to use the aws-cli to do the importing_
_FIXME: Implement a command for actually doing the importing._
