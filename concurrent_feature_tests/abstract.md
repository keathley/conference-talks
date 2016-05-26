# Concurrent Feature Tests with Wallaby

Feature tests are one of the best ways to ensure reliability and consistency for web applications. But, as your test suite grows feature tests can become a performance bottleneck. This leads to people running their tests less often or only in CI. In some cases it means avoiding feature tests altogether.

Luckily for us the release of Ecto 2.0 means that its now possible to run concurrent browser tests. Wallaby is a tool designed to take full advantage of that.

In this talk we'll look at how to configure a Phoenix application for concurrent testing, give a brief overview of Wallaby, and showcase how we can use data transformation and composition to quickly build a highly concurrent test suite.
