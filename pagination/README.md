# GraphQL Pagination

## Queries and Pagination

It took me a bit to understand how *pagination* works under the GitHub's implementation of GraphQL. Honestly it isn't that difficult. But the available documentation does not seem to provide any *workable* examples or a very clear explanation.

The GitHub GraphQL uses the *Complete Connection Model* method of pagination. Which is partially descrbed [here](https://graphql.github.io/learn/pagination/#complete-connection-model). 

Pagination Examples:

* **`/queries/user-verified-pagination-starred_repos.graphql`** : retrieves the validated user's list of starred repos where pagination can applied.

### Pagination in Detail

Using the **`/queries/user-verified-pagination-starred_repos.graphql`** file I will attempt to explain how pagination works under the GitHub GraphQL API.

First, open a GraphQL *explorer*. This example should also work with GitHub's [GraphQL Explorer](https://docs.github.com/en/free-pro-team@latest/graphql/overview/explorer). Open the Explorer and *paste* the following into it:

The query:

```
query($fst:Int, $lst:Int, $aft:String, $bef:String) {
  viewer {
    login
    name
    starredRepositories(orderBy: {direction: DESC, field: STARRED_AT},
                        first: $fst,
                        last: $lst,
                        after: $aft,
                        before: $bef) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
      edges {
        starredAt
        node {
          name
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
}
```

Variables needed by the query, paste this into the *query variables* pane :

```
{
  "fst": 3,
  "lst": null,
  "aft": null,
  "bef": null
}
```

To see how pagination works use these steps:

  1) Run the query with the data as shown below
  2) After the successful query, copy the string from the 
     result at `pageInfo.endCursor` into the `aft` data item
  3) Run the query again
  4) The next "page" will be returned

  Steps 2 - 4 can be repeated until `pageInfo.hasNextPage` 
  becomes `false`.

  5) To go to the previous page copy the string from the result
     at `pageInfo.startCursor` into the `bef` data item
  6) Set `aft` to `null`
  7) Set `fst` to `null`
  8) Set `lst` to 3
  9) Run the query again
 10) The previous "page" will be returned

  Steps 6 - 9 can be repeated until `pageInfo.hasPreviousPage` 
  becomes `false`.

**NOTE**: You will need to have some starred repositories under your account. The minimum recommended for this demonstration is 12. If you have a lot of starred repos change the value used in `"fst"` and `"lst"` to a larger value. For example, if you had 100 starred repos you could change that value from `3` to `25`. That would give you 4 pages of 25 items.
