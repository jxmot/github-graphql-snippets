# Github GraphQL Tools

This folder will contain GitHub *specific* tools. They're not fancy, an probably not that cool. But I had a "need" and created what's here to fill the need.

## gh-graphql

A browser tool that can covert a *human readable* GraphQL statement file into the required format for POST-ing it to the GitHub V4 API.

It can also send the GraphQL statement to the GitHub V4 endpoint and display the response.

### Usage

Run the `gh-graphql.html` file directly in the browser of your choice. It is not necssary to host the file.

Any of the `*.graphql` files in `/queries` or `/mutations` can be ran from it. Just drag and drop one of the files where prompted and it will be *automatically* converted to the necessary format for POST-ing to GitHuvb.

