Microservices are becoming the standard architecture for both established companies and early stage startups. But, as anyone who has worked on large distributed systems will tell you, communicating between services is daunting. This communication impacts everything from performance to state management to development and testing. When faced with these challenges we decided to take a different approach to service communication by using with event streams powered by Kafka.

In this talk we'll dive into a set of real world services and explain how we can use event streams to facilitate communication between them. We'll also explore Kafka's semantics and why it its a good choice for these types of problems. Finally we'll look at the benefits of this architecture as well as some of the potential pitfalls.

## From Rails Monolith to Elixir Services

Recently at Le Tote we were tasked with separating our legacy rails monolith
into a distributed set of Elixir services.

In this talk we'll explore the tools and techniques we used to iteratively migrate to elixir.
Specifically we'll discuss metrics gathering, running experiments in production, rollout with feature flags, and
service communication strategies.

In this talk we'll look at the different techniques that we used to break apart
our legacy codebase and explore some of the pitfalls

In this talk we'll discuss how we iteratively separated these systems.
Specifically we'll talk about metrics and


Recently we were tasked with separating several systems from our legacy
Rails monolith. We chose to do this using kafka and event streams. In this talk we'll
discuss the techniques that we used to accomplish this.

In this talk we'll look at patterns for communicating between elixir services
with event streams.

Microservices are becoming the standard architecture for both established companies and early stage startups. But, as anyone who has worked on large distributed systems will tell you, communicating between services is daunting. This communication impacts everything from performance to state management to development and testing.

When faced with these challenges we decided to take a different approach to service communication by using with event streams powered by Kafka.

In this talk we'll dive into a set of real world services and explain how we can use event streams to facilitate communication between them. We'll also explore Kafka's semantics and why it its a good choice for these types of problems. Finally we'll look at the benefits of this architecture as well as some of the potential pitfalls.
