(() => {
  getCountries();
})();

async function getCountries() {
  const response = await axios.get('https://api.covid19api.com/countries');
  loadCountries(response.data);
}

function loadCountries(data) {
  let combo = document.getElementById('cmbCountry');

  data.sort((a, b) => {
    let x = a.Country.toUpperCase();
    let y = b.Country.toUpperCase();

    return x === y ? 0 : x > y ? 1 : -1;
  });

  for (index in data) {
    combo.options[combo.options.length] = new Option(
      data[index].Country,
      data[index].Country
    );
  }
}

async function applyFilters() {
  let date_start = new Date(document.getElementById('date_start').value);
  let date_end = new Date(document.getElementById('date_end').value);
  const country = document.getElementById('cmbCountry').value;

  date_start = new Date(
    date_start.getFullYear(),
    date_start.getMonth(),
    date_start.getDate() + 1,
    -3,
    0,
    1,
    0
  );
  date_end = new Date(
    date_end.getFullYear(),
    date_end.getMonth(),
    date_end.getDate() + 1,
    -3,
    0,
    1,
    0
  );

  const response = await axios.get(
    `https://api.covid19api.com/country/${country}?from=${date_start.toISOString()}&to=${date_end.toISOString()}`
  );

  const { data } = response;
  console.log(data);

  let sumConfirmed = data.reduce((acc, elem) => acc + elem.Confirmed, 0);
  sumConfirmed = sumConfirmed / (data.length - 1);

  let sumDeaths = data.reduce((acc, elem) => acc + elem.Deaths, 0);
  sumDeaths = sumDeaths / (data.length - 1);

  let sumRecovered = data.reduce((acc, elem) => acc + elem.Recovered, 0);
  sumRecovered = sumRecovered / (data.length - 1);

  document.getElementById('kpiconfirmed').innerText =
    sumConfirmed.toLocaleString('PT');

  document.getElementById('kpideaths').innerText =
    sumDeaths.toLocaleString('PT');

  document.getElementById('kpirecovered').innerText =
    sumRecovered.toLocaleString('PT');

  console.log(sum, data.length);
}
