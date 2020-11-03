//To install a service worker you need to kick start the process by registering it in your page
//This tells the browser where your service worker Javascript files lives
//One subtlety with the [register()] method is the location of the srvice worker file.You'll notice in this case that the service worker file is at the root of the domain.
if ('serviceWorker' in navigator) {
  window.addEventListener('load',()=> {
    navigator.serviceWorker.register('../sw.js').then((registration)=> {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err)=> {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}