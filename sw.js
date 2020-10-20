  /*Caching all the resources on a browse */
  const cacheName = 'v1'; //cache name

  //creating an array to be cached which contain all the resources
  const cacheAssets = [
  'index.html',   
  '/css/theme-grid.css',
  '/css/theme-main.css',
  '/css/customized.css',
  '/fonts/fontawesome-webfont-4234.woff',
  '/fonts/OpenSans-Bold-webfont.woff',
  '/fonts/OpenSans-Regular-webfont.woff',
  '/images/icon_180x180.png',


];
 
 
 //Call Install Event
 self.addEventListener('install', (e)=>{
     console.log('Service Worker: Installed'); 
     
     //telling the browser to wait until our promise is finished getting ready with service worker
     //using cache storage api, caches.open(cacheName) which open the cache
     //output when the caches api have the name
     //adding all the resources in a cache
     //if all the resources have been added skip waiting

     e.waitUntil(
         caches
         .open(cacheName)
         .then(cache =>{
             console.log('Service Worker: Caching Files');
             cache.addAll(cacheAssets);
             
         })
         .then(()=>self.skipWaiting())
     )

 });

 //Call Activate Event
 self.addEventListener('activate', e=>{
     console.log('Service Workder: Activated');

     //Remove unwanted caches
     //Looping the array of all caches and remove all the caches which are not required
     e.waitUntil(
         caches.keys().then(cacheNames =>{
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
 self.addEventListener('fetch', e=>{
     console.log('Service Worker: Fetching');

     //First check if the live site is available, then if not we want to load the cache site
     e.respondWith(
         fetch(e.request).catch(()=> caches.match(e.request)));
 })