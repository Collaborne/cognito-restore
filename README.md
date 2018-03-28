# cognito-restore [![Build Status](https://travis-ci.org/Collaborne/cognito-restore.svg?branch=master)](https://travis-ci.org/Collaborne/cognito-restore)

This is a tool that can help restore users from a [cognito-backup](https://www.npmjs.com/package/cognito-backup) JSON file.

## Installation

```sh
npm install -g cognito-restore
```

## Usage

### `map`

```sh
$ AWS_PROFILE=... AWS_REGION=... cognito-backup backup-users OLD_USERPOOL_ID --file export.json
$ cognito-restore map --header header.csv [--attribute name=value...] export.json > users.csv
```

This will produce `users.csv` by mapping all data from `export.json` into the structure defined by `header.csv`. The `--attribute` argument
can be provided to inject additional fixed values into the CSV.

Note that there are a number of requirements for the import: https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-using-import-tool-csv-header.html. Assuming that you are using emails as identifiers you probably need to provide `--username-attribute email` as well.

The file `users.csv` can then be imported using the AWS Cognito Console.

_FIXME: Describe how to use the aws-cli to do the importing_ \
_FIXME: Implement a command for actually doing the importing._
