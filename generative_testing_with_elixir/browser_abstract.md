## Generating Browser Tests

### Description
Automated test suites are invaluable. They provide protection against regressions and can serve as a design tool when building new apis. But, despite this protection bugs still slip through. As persistent connections We could try to write more tests but attempting to cover every edge case is an untenable problem. Luckily, we can use property based testing to generate edge cases for us.

Originally developed in Haskell, property tests have spread to many other languages. In this talk we’ll discuss the basics of property testing, demonstrate how to model the behaviors of our systems, and finally we'll use Elixir to generate multiple clients interacting with our application simultaneously.

### Abstract
Automated test suites are invaluable. They provide protection against regressions and can serve as a design tool when building new apis. But, despite this protection bugs still slip through. As persistent connections We could write more tests but attempting to cover every edge case is an untenable problem. Luckily, we can use property based testing to generate edge cases for us.

Originally developed in Haskell, property tests have spread to many other languages. Unlike example based tests, property tests allow us to define a specification for our algorithms. Once we have this specification we can then use generators to specify all possible input values. These values are checked against our specification. If a bug is found then the data is "shrunk" until it is the smallest failing test case.

In this talk we’ll discuss the basics of property testing, demonstrate how to model the behaviors of our systems, and finally we'll use Elixir to generate multiple clients interacting with our application simultaneously.
