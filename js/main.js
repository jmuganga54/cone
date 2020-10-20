//Make sure sw is working
if('serviceWorker' in navigator){
    //We need to register service worker when the application is on load
    window.addEventListener('load',()=>{
      navigator.serviceWorker 
      .register('../sw.js') //registering service worker
      .then(reg => console.log('Service Worker: Registered')) // if service worker registered successfull display
      .catch(error => console.log('Service Worker: Error: ${error}'))//if not display error
    })
  }
  