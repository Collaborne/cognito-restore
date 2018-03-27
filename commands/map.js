exports.command = 'map <export>';
exports.describe = 'map exported users into CSV';
exports.builder = yargs => {
	return yargs
		.positional('export', {demandOption: true})
		.option('attribute', {
			describe: 'Attribute to set to a value',
			type: 'string',
		})
		.option('header', {
			demandOption: 'true',
			describe: 'CSV file with the required format (can be download from Cognito)',
			type: 'string'
		})
		.coerce('attribute', value => {
			return Array.isArray(value) ? value : [value];
		});
};

const fs = require('fs');
const parseCSV = require('csv-parse');
const stringifyCSV = require('csv-stringify');

function mapUser(user, extraAttributes) {
	const mappedExtraAttributes = extraAttributes.map(extraAttribute => extraAttribute.split(/=/, 2)).reduce((agg, kv) => Object.assign(agg, {[kv[0]]: kv[1]}), {});
	const mappedAttributes = user.Attributes.reduce((agg, attribute) => Object.assign(agg, {[attribute.Name]: attribute.Value}), mappedExtraAttributes);
	return Object.assign({
		'cognito:username': user.Username,
		updated_at: user.UserLastModifiedDate,
	}, mappedAttributes);
}

function mapUsers(users, extraAttributes = []) {
	return users.map(user => mapUser(user, extraAttributes));
}

function handleMap(argv) {
	return new Promise((resolve, reject) => {
		return fs.readFile(argv.header, 'utf8', (headerFileErr, headerData) => {
			if (headerFileErr) {
				return reject(headerFileErr);
			}

			return parseCSV(headerData, {}, (headerErr, keys) => {
				if (headerErr) {
					return reject(headerErr);
				}

				return fs.readFile(argv.export, 'utf8', (exportFileErr, exportData) => {
					try {
						const users = JSON.parse(exportData);
						const mappedUsers = mapUsers(users, argv.attribute);
						const stringifyOptions = {
							columns: keys[0],
							header: true
						};
						return stringifyCSV(mappedUsers, stringifyOptions, (stringifyErr, outputData) => {
							if (stringifyErr) {
								return reject(stringifyErr);
							}

							process.stdout.write(outputData);
							return resolve(mappedUsers);
						});
					} catch (exportErr) {
						return reject(exportErr);
					}
				});
			});
		});
	});
}

exports.handler = handleMap;
