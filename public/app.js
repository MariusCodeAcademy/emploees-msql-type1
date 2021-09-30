const url = 'http://localhost:3000';
const getEmploees = async () => {
  const resp = await fetch(`${url}/employees/`);
  const data = await resp.json();
  if (data.msg === 'success') {
    return console.log('data', data.result);
  }
  // console.log('');
  console.log('somethin went worng', data);
};

getEmploees();
