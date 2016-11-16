/*
 * Copyright 2016 Turner Broadcasting System, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const generators = require('yeoman-generator');


/**
 * Validates that a string is a valid POSIX.1-2013 3.92 character string.
 *
 * @see http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_92
 *
 * @param {?string} input
 * The string to validate.
 *
 * @return {boolean|string}
 * Will either be true, or a string.  If it is a string, validation failed.
 */
function validateCharacterString(input) {
    return (input.length > 0) ? true : 'Must be a valid POSIX.1-2013 3.92 Character String!';
}


/**
 * Validates that a string is a valid POSIX.1-2013 3.170 filename.
 *
 * @see http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_170
 *
 * @param {?string} input
 * The string to validate.
 *
 * @return {boolean|string}
 * Will either be true, or a string.  If it is a string, validation failed.
 */
function validateFilename(input) {
    let isValidCharacterString = validateCharacterString(input);

    if (isValidCharacterString !== true) {
        return isValidCharacterString;
    }

    return (input.search(/ /) === -1) ? true : 'Must be a valid POSIX.1-2013 3.170 Filename!';
}


/**
 * Validates that a string is a valid url for a repository in the cnnlabs GitHub
 * organization.
 *
 * @param {?string} input
 * The string to validate.  Should match the following regexp:
 *
 * @see https://regex101.com/r/bF0xK5/1
 *
 * @return {boolean|string}
 * Will either be true, or a string.  If it is a string, validation failed.
 */
function validateRepositoryUrl(input) {
    return /^https:\/\/github.com\/[^\/]+\/.+\.git$/.test(input) ? true : 'Use the https clone url from the repository that was created. Should end with `.git`';
}


/*
 * Running context order reference:
 *
 *     initializing
 *     prompting
 *     configuring
 *     default
 *     writing
 *     conflicts
 *     install
 *     end
 *
 * More details at http://yeoman.io/authoring/running-context.html
 */
module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        this.option('extend');
    },

    initializing: {
        templates: function () {
            if (this.options.extend) {
                this.log(`Extending cnn-base with ${this.options.extend}`);
                this.composeWith(this.options.extend);
            }
        }
    },

    prompting: {
        prompt: function () {
            let done = this.async();

            this.prompt(
                [
                    {
                        type: 'input',
                        name: 'repositoryName',
                        message: 'Repository name (spaces not allowed)',
                        default: process.cwd().match(/[^\/]+$/)[0],
                        validate: validateFilename
                    },
                    {
                        type: 'input',
                        name: 'projectName',
                        message: 'Project name (spaces allowed)',
                        validate: validateCharacterString
                    },
                    {
                        type: 'input',
                        name: 'projectDescription',
                        message: 'Project description',
                        default: function (answers) {
                            return answers.projectName;
                        }
                    },
                    {
                        type: 'list',
                        name: 'minimumNodeVersion',
                        message: 'Minimum node version',
                        default: '5.6.0',
                        choices: [
                            '4.3.0',
                            '5.6.0'
                        ]
                    },
                    {
                        type: 'confirm',
                        name: 'useGitHub',
                        message: 'Create a GitHub repository',
                        default: true
                    },
                    {
                        type: 'input',
                        name: 'githubRepositoryUrl',
                        message: 'GitHub repository url',
                        validate: validateRepositoryUrl,
                        when: function (answers) {
                            return answers.useGitHub;
                        }
                    },
                    {
                        type: 'input',
                        name: 'gitEmail',
                        message: 'Git email',
                        default: this.user.git.email(),
                        validate: validateCharacterString,
                        when: function (answers) {
                            return answers.useGitHub;
                        }
                    },
                    {
                        type: 'input',
                        name: 'gitName',
                        message: 'Git name',
                        default: this.user.git.name(),
                        validate: validateCharacterString,
                        when: function (answers) {
                            return answers.useGitHub;
                        }
                    }
                ],

                function (answers) {
                    // this.githubRepositoryUrl = answers.githubRepositoryUrl;
                    this.minimumNodeVersion = answers.minimumNodeVersion;
                    this.projectName = answers.projectName;
                    this.projectDescription = answers.projectDescription;
                    this.repositoryName = answers.repositoryName;
                    this.gitName = answers.gitName;
                    this.gitEmail = answers.gitEmail;

                    done();
                }.bind(this)
            );
        }
    },

    configuring: {
        models: function () {
            this.templateModel = {
                MINIMUM_NODE_VERSION: this.minimumNodeVersion,
                PROJECT_NAME: this.projectName,
                PROJECT_DESCRIPTION: this.projectDescription,
                REPOSITORY_NAME: this.repositoryName
            };
        }
    },

    writing: {
        copyFiles: function () {
            // Each file in the root direction needs to be explicitly set due to
            // the dot files needing to be renamed.  Anything in folders can be
            // bulk copied.
            this.fs.copy(this.templatePath('.npm-init.js'), this.destinationPath('.npm-init.js'));
            this.fs.copy(this.templatePath('_editorconfig'), this.destinationPath('.editorconfig'));
            this.fs.copy(this.templatePath('_eslintignore'), this.destinationPath('.eslintignore'));
            this.fs.copy(this.templatePath('_eslintrc'), this.destinationPath('.eslintrc'));
            this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
            this.fs.copy(this.templatePath('_npmrc'), this.destinationPath('.npmrc'));

            this.fs.copy(this.templatePath('AUTHORS.md'), this.destinationPath('AUTHORS.md'));
            this.fs.copy(this.templatePath('LICENSE.md'), this.destinationPath('LICENSE.md'));

            this.fs.copy(this.templatePath('test/'), this.destinationPath('test/'));
            this.fs.copy(this.templatePath('tools/'), this.destinationPath('tools/'));
        },

        copyTemplates: function () {
            this.fs.copyTpl(this.templatePath('_esdoc.json'), this.destinationPath('.esdoc.json'), this.templateModel);
            this.fs.copyTpl(this.templatePath('_nvmrc'), this.destinationPath('.nvmrc'), this.templateModel);
            this.fs.copyTpl(this.templatePath('CHANGELOG.md'), this.destinationPath('CHANGELOG.md'), this.templateModel);
            this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.templateModel);
            this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), this.templateModel);
        },

        createRepository: function () {
            this.spawnCommandSync('git', ['init']);

            if (this.gitName !== this.user.git.name()) {
                this.spawnCommandSync('git', ['config', '--local', 'user.name', this.gitName]);
            }

            if (this.gitEmail !== this.user.git.email()) {
                this.spawnCommandSync('git', ['config', '--local', 'user.email', this.gitEmail]);
            }
        }
    },

    install: {
        npmInit: function () {
            this.spawnCommandSync('npm', ['init']);
        },

        npmInstall: function () {
            this.npmInstall([
                'chai',
                'changelog-maker',
                'esdoc',
                'eslint',
                'istanbul',
                'jq-cli-wrapper',
                'jsonlint',
                'mocha',
                'npm-check-updates'
            ], {saveDev: true});
        }
    },

    end: {
        message: function () {
            this.log('cnn-base completed');
        }
    }
});
