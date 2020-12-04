# github-graphql-snippets

A collection of *working* GraphQL queries that access the GitHub API V4.

## How I Got Here...

I've been working with the GitHub **V3** API for a while and started looking into switching over to **V4**. It seemed complicated at the time and I didn't have any spare time to devote to the task.

Then I came across [github-readme-stats](<https://github.com/anuraghazra/github-readme-stats>) an application which uses *both* the V3 and V4 API. This gave me a chance to exract the V4 code and try it out.

As a result of "trying it out" I created some queries in order to understand the GitHub V4 API and the data it provides.

## Tools

I've been using the [GraphiQL](<https://github.com/skevy/graphiql-app>) application to test the queries that are provided here. It's not the *best* application, and the last release was two years old. But it is linked to in the GitHup API documentation.

### Set Up

You'll need the following:

* A GitHub Personal Access Token
* The API Endpoint - https://api.github.com/graphql

The *GitHub Personal Access Token* is obtained through your GitHub account. They can be created in the `Settings->Developer->Personal access tokens` menu.

Enable the following options for your new **GitHub Personal Access Token**:

* `read:gpg_key`
* `read:org`
* `read:public_key`
* `read:repo_hook`
* `repo`
* `user`

Run the GraphiQL application and:

1) Enter the endpoint
2) Select **`POST`** as the method
3) Click the "Edit HTTP Header" button and a dialog box will appear...

<p align="center">
  <img src="./mdimg/ss_1.png" alt="" txt="" width="80%">
</p>

1) Click the "+ Add header" button
2) Under "Header name" enter **`Authorization`**
3) Under "Header value" enter your personal access token, precede it with the word **`Bearer`**. It will look like this: `Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` Where `xxx...` is your personal access token.
4) Click anywhere outside of the dialog and it will close.

<p align="center">
  <img src="./mdimg/ss_2.png" alt="" txt="" width="80%">
</p>

Your ready for your first query!

### Application Quirks

* Queries **cannot** be saved from within the application.
* The *output* pane is cleared when switching between tabs.
* The *Documentation Explorer* pane is cleared when switching between tabs.
* Tab *query* panes will be retained when exiting the application. But it appears that this is only done if the query tab has been renamed.

## Queries

If you don't know already GraphQL is a lot different from SQL. Is it better? That depends on a number of things:

* The *structure* of a query is better than SQL. It's a little easier to understand complex queries over SQL.
* Did the implementer document the schema and fields well enough? In the case of the GitHub API it is.

## Example Query

Here's a simple query to start off with:

File: **`/queries/user-lifetime-data.graphql`**

```
# Get Contribution Years and Lifetime Data
# 
# The values returned by this query represent the totals for 
# the lifetime of the user. 
{
  user(login: "jxmot") {
    name
    # Let's retreive a collection of the user's repositories
    contributionsCollection {
      # will be 'true' if they've had any contributions
      hasAnyContributions
      # The years (2020, 2019, etc) that the use has been contributing
      contributionYears
    }
    # the total number of repositories owned by the user, no forks are counted
    repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
      totalCount
    }
    # the total number of repositories NOT owned by the user that they contributed to
    repositoriesContributedTo(first: 100) {
      totalCount
    }
    # the total number of pull requests created by the user
    pullRequests(first: 1) {
      totalCount
    }
    # the total number of issues created by the user
    issues(first: 1) {
      totalCount
    }
    # the total number of followers that the user has
    followers {
      totalCount
    }
  }
}

```

And here is the result of the query:

*Please note that this query uses my personal access token. If you run the same query it will return different values.*

```
{
  "data": {
    "user": {
      "name": "J.Motyl",
      "contributionsCollection": {
        "hasAnyContributions": true,
        "contributionYears": [
          2020,
          2019,
          2018,
          2017,
          2016
        ]
      },
      "repositories": {
        "totalCount": 71
      },
      "repositoriesContributedTo": {
        "totalCount": 4
      },
      "pullRequests": {
        "totalCount": 112
      },
      "issues": {
        "totalCount": 166
      },
      "followers": {
        "totalCount": 13
      }
    }
  }
}
```

## Example Query Files

* **`/queries/user-lifetime-data.graphql`** : shown above
* **`/queries/user-lifetime-data-all.graphql`** : based on the previous query, but this one also retrieves the total number of forks, stars, and watchers for each repo
* **`/queries/user-contribs-by_year.graphql`** : retrieves data for the time span specified, a maximum of one year
* **`/queries/user-repos-lang_stats.graphql`** : retrieves the user's repos and lists the languages that each contains

## GitHub V4 API Quirks

* *Lifetime* data **does not** include any means for obtaining the **lifetime total of commits**. This is frustrating because in order to obtain that value multiple calls to something like **`/queries/user-contribs-by_year.graphql`** must be made.
* The method to retrieve *counts* is inconsistent in some cases. For example, in `User.repositories.RepositoryConnection.nodes.Repository` you can directly get counts with `forkCount` and `stargazerCount`. But there is no access for a watcher count. Instead it's necessary to access `User.repositories.RepositoryConnection.nodes.Repository.watchers.totalCount`.


