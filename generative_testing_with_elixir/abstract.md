# Don't write tests. Generate them.

## Abstract
Elixir gives us powerful tools to think about our systems in terms of invariants. Using these invariants we can generate test cases instead of writing them by hand.

## Description
Automated test suites are invaluable. They provide protection against regressions and can serve as a design tool when building new apis. But, despite this protection bugs still slip through. We could try to write more tests but attempting to cover every edge case is an untenable problem. Luckily, we can use property based testing to generate edge cases for us.

Originally developed in Haskell, property tests have spread to many other languages. Property tests allow us to describe the "laws" of our applications and then use those "laws" to automatically generate thousands of test cases. In this talk we’ll discuss the basics of property testing and demonstrate how we can determine properties for our systems. Finally, we'll create a property test suite for a web application and use our properties to generate hundreds of test cases in order to pinpoint a race condition.

Writing tests has never been so fun.
