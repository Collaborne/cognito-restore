#!/usr/bin/env node

'use strict';

require('yargs') // eslint-disable-line no-unused-expressions
	.commandDir('commands')
	.demandCommand()
	.help()
	.argv;
