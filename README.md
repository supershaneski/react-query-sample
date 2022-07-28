react-query-sample
===========

This React project is bootstrapped using [Vite](https://vitejs.dev/guide/).



# Goal

The primary goal of this project is to get to know react-query.

I am using just plain fetch() instead of axios, etc. to observe react-query's behavior.



# The Project

Instead of making another todo app, I tried making something that has the basic functions that I need.

I am not actually sure what I ended up making lol.



Basically, there are groups, members under those groups and associated data for each members.

In the Home page, the members will be shown organized by groups.


![Home page](public/image1.png)


When the user selects a member, it will go to the Member page to show the associated data for that member.


![Member page](public/image2.png)


# Observations

There are still lots to learn and I am probably just scratching what react-query can do.

So far here are my observations:


- I can see that it refetches when request fails. Can it do exponential backoff? [Yes](https://tanstack.com/query/v4/docs/guides/important-defaults). By default, it will retry 3X when request fails and it is possible to change it.
  
```javascript
const { isLoading, error, data, refetch } = useQuery(['groups'], fetchGroups, {retry: 5, })
```
  
- It caches the response. And we can use `staleTime` and `cacheTime` to control when the time to retry fetch and how long will the cache be retained.

```javascript
const { isLoading, error, data, refetch } = useQuery(['groups'], fetchGroups, {staleTime: 10000, }) // won't refetch again for 10s
```

- Testing posting data using `useMutation`. It works like charm. Combined with [`invalidateQueries`](https://tanstack.com/query/v4/docs/guides/query-invalidation), what more one should ask for? Note to self, do not enable `refetchOnMount` in the `useQuery` options.

```javascript
const queryClient = useQueryClient()

const mutation = useMutation((data) => {
        return postData(data)
    }, {
        onSuccess: (data, variable, context) => {
            queryClient.invalidateQueries({
                predicate: query => query.queryKey[0] === 'data' && query.queryKey[1] === memberId && query.queryKey[2] >= 0,
            })
        },
    })
```


- Lastly, how do I handle [JWT](https://auth0.com/learn/json-web-tokens/) refresh token? It seems I need to use [react-query-auth](https://www.npmjs.com/package/react-query-auth) or similar library for authentication.




Aside from the last item (auth) which I have not yet tried, it covers all my concern brilliantly!



# Installation

After cloning, go to the project directory and install the required modules

```sh
$ npm install
```

To run the app

```sh
$ npm start
```

