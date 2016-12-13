Automated test suites are invaluable. They provide protection against regressions and can serve as a design tool when building new apis. But, despite this protection bugs still slip through. We could try to write more tests but attempting to cover every edge case is an untenable problem. Luckily, we can use property based testing to generate edge cases for us.

Originally developed in Haskell, property tests have spread to many other languages. In this talk we’ll discuss the basics of property testing, demonstrate how we can determine properties for our system, and look at real world examples of property tests using elixir.