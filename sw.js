  /*Caching all the resources on a browse */
  const cacheName = 'cone-bioassay-v1'; //cache name

  //creating an array which contain all the resources to be cached
  const assetsToCache = [ 
  '/css/theme-grid.css',
  '/css/theme-main.css',
  '/css/customized.css',
  '/fonts/fontawesome-webfont-4234.woff',
  '/fonts/OpenSans-Bold-webfont.woff',
  '/fonts/OpenSans-Regular-webfont.woff',
  '/images/icon_180x180.png',
  'js/main.js',
  'index.html'
];
 
 
 //Call Install Event
 self.addEventListener('install', (event)=>{
     console.log('Service Worker: Installed'); 
     
  /*Inside of our install callback, we neeed to take the following steps:
   1:Open a cache, 2.Cache our files 3. Confirm whether all the required assets are cached or not */

   //Perform install steps
     event.waitUntil(
         caches.open(cacheName)
         .then((cache) =>{
             console.log('Opened Cache');
             return cache.addAll(assetsToCache);

             /*NB Here you can see we call [caches.open()] with our desired cache name, after which we call [cache.addAll()] and pass in our array of files.This is a chain of promises [(cache.open())] and [cache.addAll()].The event.waitUntill() method takes a promise and uses it to know how long installation takes, and whether it succeeded or not.*/
             
         })
        //  .then(()=>self.skipWaiting())
     )

 });

  //Call Activate Event
  self.addEventListener('activate', (event)=>{
    console.log('Service Workder: Activated');

    //Remove unwanted caches
    //Looping the array of all caches and remove all the caches which are not required
    event.waitUntil(
        caches.keys().then((cacheNames) =>{
            return Promise.all(
                cacheNames.map(cache =>{
                   if(cache != cacheName){
                       console.log('Service Worker: Clearing Old Cache');
                       return caches.delete(cache);
                   }
                })
            )
        })
    )
     
});

 //Call Fetch Event
 self.addEventListener('fetch', (event) =>{
    console.log('Service Worker: Fetching');

    //First check if the live site is available, then if not we want to load the cache site
    event.respondWith(
      caches.match(event.request)
        .then((response) =>{
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );

    /*NB Here we've defined our fetch event and within [event.respondWith()], we pass in a promise from caches.match().This method looks at the request an finds any cached results from any of the caches your service worker created. 
    
    If we have a matching response, we return the cached value, otherwise we return the result of a call to fetch, which will make a network request and return the data if anything can be retrieved from the network. This is a simple example and uses any cached assets we cached during the install step.
    */
  });


