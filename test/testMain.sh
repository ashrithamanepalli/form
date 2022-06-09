FAILED='❌';
PASSED='✅';

function assert(){
  local actual=$1
  local expected=$2
  local description=$3

  echo ${actual} > /tmp/actual.txt
  echo ${expected} > /tmp/expected.txt

  diff /tmp/actual.txt /tmp/expected.txt

  local exit_code=$?

  local status=${FAILED}
  if [[ exit_code -eq 0 ]]
  then
    status=${PASSED}
  fi
  echo ${status} ${description}
};

function test_prompts(){
  local prompts=$(node main.js<<eof
ashritha
1234-09-76
singing,humming
1234567890
eof
);

  local expectedPrompts="Enter name Enter dob Enter hobbies Enter phNum Thank You";
  assert "${prompts[@]}" "${expectedPrompts}" 'prompts'
};

function test_prompts_for_invalid_response(){
  local prompts=$(node main.js<<eof
ash
ashritha
1234-09-76
singing,humming
1234567890
eof
);

  local expectedPrompts="Enter name Invalid Response Enter name Enter dob Enter hobbies Enter phNum Thank You";
  assert "${prompts[@]}" "${expectedPrompts}" 'prompts_for_invalid_response'
};

function test_responses(){
  local prompts=$(node main.js << eof
ashritha
1234-09-76
singing,humming
1234567890
eof
)

  local actualResponses=$(cat ./src/form.json);
  local expectedResponses='{"name":"ashritha","dob":"1234-09-76","hobbies":["singing","humming"],"phNum":"1234567890"}'
  assert "${actualResponses}" "${expectedResponses}" 'responses'
};

test_prompts
test_prompts_for_invalid_response
test_responses
