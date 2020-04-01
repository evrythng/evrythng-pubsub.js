evrythng.use(PubSub)

const getQueryParam = key => new URLSearchParams(window.location.search).get(key)

const addListItem = item => {
  const li = document.createElement('li')
  li.innerHTML = JSON.stringify(item)
  document.getElementById('list').appendChild(li)
}

const main = async () => {
  const apiKey = getQueryParam('trustedApp')
  if (!apiKey) {
    alert('Please specify \'trustedApp\' query parameter')
    return
  }

  const trustedApp = new evrythng.TrustedApplication(apiKey)
  await trustedApp.init()

  window.trustedApp = trustedApp

  trustedApp.action('all').subscribe(addListItem)
}

main()
