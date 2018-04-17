export function PostUser(res, tokenId) {
  let userData = res
  return new Promise((resolve, reject) => {
    fetch('https://goat-reviews-api.herokuapp.com/api/v1/auth', {
      method: "POST",
      headers: {
        "HTTP_AUTHORIZATION": `Bearer ${tokenId}`,
        'Authorization': tokenId,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(userData)
    })
      .then((response) => response.text())
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
