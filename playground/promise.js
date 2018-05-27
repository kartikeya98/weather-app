var asyncAdd = (a,b) => {
  return  new Promise((resolve , reject) => {
        setTimeout(() => {
          if(typeof a === 'number' && typeof b === 'number') {
              resolve(a+b);
          }
          else {
          reject("unable to fetch arguments");
  }
},1500)
})
}

asyncAdd(5,7).then((res) => {
  console.log('result:',res);
  return asyncAdd(res,'7').then((res) => {

    console.log('it is',res)
  })
}).catch((errorMessage) => {

  console.log('error',errorMessage);
})
