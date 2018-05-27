console.log('starting basics.js');

setTimeout(() => {
  console.log('inside a callback');
},2000);

setTimeout(() => {
  console.log('inside a callback22');
},0000);

console.log('finishing basics.js');
