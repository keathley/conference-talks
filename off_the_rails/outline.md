# Off the Rails - Outline

Why do we want to do this
- already passionate about the elixir community
- benefits of elixir (scale, fault tolerance)
- Benefits of Phoenix (all the nice mechanisms that rails has with none of the baggage, real time)

Our app was a good fit:
- real time with pusher
- Rails API
- Rails talks to pusher
- Angular front end.

The power of starting things.

1 person just decided to do it

Make incremental progress
- we started by just setting up a single endpoint. All the assets were still served from Rails, even in development.
- We had to clone the data model to avoid an ETL process.
- Had to do migrations on the db to make the migrations table work.

We played with the idea of using "alchemy" to do this.
- worked pretty well but we didn't get far with it because we moved on without it.

Alex joined to take us the last mile. Finished up the last endpoints.

Moved asset compilation into Phoenix.

Deployed to production.

Deployed everything to heroku
- elixir and Phoenix buildpacks
- node buildpack
- Had to tweak db connections for heroku
- Had to tweak connection timeout to avoid errors on heroku.

Then we went back and ported pusher to Phoenix channels.

Started removing Ruby ephemera from our stack.
- Created mix tasks to replace take tasks. (Background syncing)
- Started porting all of our feature tests. Wanted to take advantage of concurrency so we wrote Wallaby.

Real metrics

- 3 developers part time.
- How much time did it take?
- X total contributors (find out how many).
- 2 people knew elixir before we started on it.
- Response time
- Testing time
- Lines of code
- Compressability
- open source projects.
- X number of open source contributions.

Soft metrics:

- "this feels so much better"
- performance is a feature
- Lots of cumbersome and difficult code was removed. This is partly because we understood the problem and partly because the solution was easier to express with elixir.
- Database constraints are the best
- A node asset pipeline was really useful to start the migration process.
