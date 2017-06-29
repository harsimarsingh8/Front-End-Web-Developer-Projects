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
        it(' feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length > 0).toBe(true);
        });


        /* : Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('make sure that  url is defined , not empty and not null', function() {
            for (var m = 0; m < allFeeds.length; m++) {
                expect(allFeeds[m].url).toBeDefined();
                expect(allFeeds[m].url.length > 0).not.toBe(false);
                expect(allFeeds[m].url).not.toBeNull();

            }
        });


        /* .: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('is name defined and should not be empty', function() {
            for (var a = 0; a < allFeeds.length; a++) {
                // we need to also see that the name is not null
                // we need to also see that the length of the  name is greater than 0
                expect(allFeeds[a].name.length > 0).not.toBe(false);
                expect(allFeeds[a].name).toBeDefined();
            }
        });
    });




    /* .: Write a new test suite named "The menu" */
    describe("The menu", function() {


        /* .: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it("the menu element is hidden by default", function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);

        });
        /* .: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it("visibility mode:::Display(show)/hide  on clicking", function() {
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).not.toBe(true);
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).not.toBe(false);
        });
    });

    /* .: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {


        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* .: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * the use of Jasmine's beforeEach and asynchronous done() function.
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         */
        it("should be atleast one entry in  feed container", function(done) {
            expect($('.feed .entry').length > 0).not.toBe(false);
            done();
        });
    });

    /* .: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {

        /* .: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //created 2 variables for old and new feed
        var oFeed;
        var updatedFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                oFeed = $('.feed').html();
                loadFeed(1, function() {
                    updatedFeed = $('.feed').html();
                    done();
                });

            });

        });

        //new feed should not be same as the old feed
        it("it is updated now so looks different from ofeed(old-feed)", function() {
            expect(updatedFeed).not.toEqual(oFeed);
        });
    });

}());
