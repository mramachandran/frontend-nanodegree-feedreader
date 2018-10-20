/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    


    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            allFeeds.forEach(function(feed) {
                expect(feed.length).not.toBe(0);        
            });
            
        });


        /*  Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined', function() {
            expect(allFeeds).toBeDefined();
            allFeeds.forEach(function(feed) {
                expect(feed.url).not.toBe(0);        
            });            
           
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have Name defined', function() {
            expect(allFeeds).toBeDefined();
            allFeeds.forEach(function(feed) {
                expect(feed.name).not.toBe(0);        
            }); 
        });

    });


    /* test suite named "The menu" */
    
    describe('The menu', function() {

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('is hidden be default', function() {          
            expect($( 'body' ).hasClass( "menu-hidden" )).toBe(true);
        });

        it('is dispalyed when clicked', function() {    
            $('.menu-icon-link').click();      
            expect($( 'body' ).hasClass( "menu-hidden" )).toBe(false);
        });

        it('is hidden when clicked again', function() {    
            $('.menu-icon-link').click();      
            expect($( 'body' ).hasClass( "menu-hidden" )).toBe(true);
        });       
        

        });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            setTimeout(function() {          
              // do some stuff
              loadFeed(0); 
              oldFirstURL = allFeeds[0].url;  
              loadFeed(1) ;
              done();
              newFirstURL = allFeeds[1].url;                                
            }, 1000);
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least a single entry within the feed', function() {
             
             expect($('.feed .entry').length>0).toBe(true);
        });
    });


  
    /* Test suite named "New Feed Selection" */

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * 
         * InnerHTML dom element is used to get the html markup
         * contained within the element.
         */

        
        describe('New Feed Selection', function() {
            let  initialFeed, finalFeed; 
            beforeEach(function(done) {        
                  // do some stuff
                  loadFeed(0, function() {
                     initialFeed = $('.feed')[0].innerHTML;//https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
                     console.log(initialFeed);
                    //load a new feed
                    loadFeed(1,function(){
                         finalFeed = $('.feed')[0].innerHTML;
                        done();
                    });

                  });                                                                            
                });
    
            it('loads new content', function() {
                //expect(allFeeds).toBeDefined();
                expect(initialFeed).not.toBe(finalFeed);
            });
        });
    
}());
