async function aposDoisSegundos(valor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(valor);
    }, 2000);
  })
}

console.log(aposDoisSegundos('Olá'))


