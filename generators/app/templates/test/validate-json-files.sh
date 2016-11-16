#!/bin/bash

# Copyright 2016 Turner Broadcasting System, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# This can be done in one line, but the file that has the error is not captured
#
# find . -name "*.json" -not -path "./node_modules/*" -not -path "./test/*" -not -path "./ruby/*" | xargs -n1 node_modules/.bin/jsonlint -q
# [Error: Parse error on line 14:
# ...       }    }    "mediaStyle-cnn": {
# --------------------^
# Expecting 'EOF', '}', ',', ']', got 'STRING']
#
# Ehh, works, but not ideal.

EXIT_CODE=0
JSON_FILES=(`find . \
                  -name "*.json"\
                  -not -path "./.c9/*"\
                  -not -path "./.ignore/*"\
                  -not -path "./coverage/*"\
                  -not -path "./docs/*"\
                  -not -path "./node_modules/*"\
            `)

for file in "${JSON_FILES[@]}"; do
    echo "json validating: ${file}"
    node_modules/.bin/jsonlint "${file}" -q
    if [ $? -eq 1 ]; then
        echo "${file}"
        EXIT_CODE=1
    fi
done

exit ${EXIT_CODE}
