# Don't write tests. Generate them.

## Abstract

Elixir gives us powerful tools to think about our systems in terms of invariants. Using these invariants we can generate test cases instead of writing them by hand.

## Description

Automated test suites are invaluable. They provide protection against regressions and can serve as a design tool when building new apis.
But writing tests by hand is a time consuming and error prone process. More importantly, no matter how robust your test suite is bugs can continue to slip through. Many people attempt to combat these bugs by writing more tests. Long term these test suites become a hinderance to development and provide rapidly diminishing returns. It's simply impossible to write enough tests to fully exercise an application. Luckily we can use property tests to create tests for us.

Property tests allow us to describe the "laws" of our applications and then use those "laws" to generate thousands of test cases. In this talk we’ll discuss the basics of property testing and demonstrate how we can determine properties for our systems. We'll discuss how to apply property tests to real world problems using statemachines. Finally we'll use property tests to simulate multiple users simultaneously interacting with a phoenix application in order to find race conditions.
