async function getCountries() {
  let data = []
  await fetch('https://restcountries.com/v2/all')
    .then((response) => response.json())
    .then((data_api) => (data = data_api))
    .catch((error) => console.error(error))

  console.log(data)

  const body = document.getElementsByTagName('body')[0]

  const main = document.createElement('div')
  main.className = 'main'

  //search
  const searchContainer = document.createElement('div')
  searchContainer.className = 'search-container'

  //input
  const input = document.createElement('input')
  input.className = 'input'
  input.setAttribute('placeHolder', '  Search for a country...')
  input.setAttribute('type', 'search')
  input.setAttribute('id', 'searchbox')

  const searchBtn = document.createElement('button')
  searchBtn.className = 'search-button'
  searchBtn.innerText = 'Search'
  searchContainer.append(input, searchBtn)

  body.appendChild(searchContainer)

  function countries(data) {
    for (let index in data) {
      const countryContainer = document.createElement('div')
      countryContainer.className = 'country-container'

      // img
      const img = document.createElement('img')
      img.src = `${data[index]['flag']}`
      img.className = 'flag'
      img.alt = 'flag'
      countryContainer.appendChild(img)

      // name
      const name = document.createElement('p')
      name.innerText = `${data[index]['name']}`
      name.className = 'name'
      countryContainer.appendChild(name)

      // Population
      const populationContainer = document.createElement('div')
      populationContainer.className = 'text-container'

      const populationTitle = document.createElement('p')
      populationTitle.innerText = 'Population: '
      populationTitle.className = 'title'

      const populationContent = document.createElement('p')
      const populationNumber = `${data[index]['population']}`

      function moneyFormat(num) {
        let returnedNum = Intl.NumberFormat('en-US')
        return returnedNum.format(num)
      }

      populationContent.innerText = moneyFormat(populationNumber)
      populationContent.className = 'content'

      populationContainer.append(populationTitle, populationContent)
      countryContainer.appendChild(populationContainer)

      // Region:
      const regionContainer = document.createElement('div')
      regionContainer.className = 'text-container'

      const regionTitle = document.createElement('p')
      regionTitle.innerText = 'Region: '
      regionTitle.className = 'title'

      const region = document.createElement('p')
      region.innerText = `${data[index]['region']}`

      regionContainer.append(regionTitle, region)
      countryContainer.appendChild(regionContainer)

      // Capital
      const capitalContainer = document.createElement('div')
      capitalContainer.className = 'text-container'

      const capitalTitle = document.createElement('p')
      capitalTitle.innerText = 'Capital: '
      capitalTitle.className = 'title'

      const capital = document.createElement('div')
      capital.innerText = `${data[index]['capital']}`

      capitalContainer.append(capitalTitle, capital)
      countryContainer.appendChild(capitalContainer)

      main.appendChild(countryContainer)

      // function liveSearch() {
      //   let cards = data
      //   let searchQuery = document.getElementById('searchbox').value

      //   for (let i = 0; i < cards.length; i++) {
      //     if (cards[i]['name'] == searchQuery) {
      //       cards[i].classList.remove('hidden')
      //       console.log('is there')
      //     } else {
      //       cards[i].classList.add('hidden')
      //       console.log('is not there')
      //     }
      //   }
      // }
      // input.addEventListener('input', liveSearch)
    }
    body.appendChild(main)
  }
  countries(data)
}
getCountries()
