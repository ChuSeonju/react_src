fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);

// const token = '₩₩₩₩';

// fetch('https://api.github.com/users/ChuSeonju', {
//     headers: {
//         'Authorization': `token ${token}`
//     }
// })
// .then(response => response.json())
// .then(console.log)
// .catch(console.error);
