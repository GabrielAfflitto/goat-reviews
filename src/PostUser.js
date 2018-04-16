export function PostUser(res, tokenId) {
  let userData = res
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/api/v1/auth', {
      method: "POST",
      headers: {
        "HTTP_AUTHORIZATION": `${tokenId}`,
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
