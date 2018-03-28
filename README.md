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

## License

    This software is licensed under the Apache 2 license, quoted below.

    Copyright 2011-2018 Collaborne B.V. <http://github.com/Collaborne/>

    Licensed under the Apache License, Version 2.0 (the "License"); you may not
    use this file except in compliance with the License. You may obtain a copy of
    the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
    License for the specific language governing permissions and limitations under
    the License.
