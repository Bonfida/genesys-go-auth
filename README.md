<h1 align="center">Cloudflare worker - Genesys Go</h1>
<br />
<p align="center">
<img width="250" src="https://ftx.com/static/media/fida.ce20eedf.svg"/>
</p>
<br />

This tutorial explains how to use [Cloudflare workers](https://workers.cloudflare.com/) to set up [OAuth for Genesys Go RPC endpoints](https://genesysgo.medium.com/a-primer-to-genesysgo-network-auth-a3c678a9dc2a).

<br />
<h2 align="center">Genesys Go credentials</h2>
<br />

Once you have your `client_id` and `secret` you will to generate your base64 encoded token as below:

```js
> btoa(`${client_id}:${secret}`);
```

For instance if your `client_id` is `bonfida` and your `secret` is `553e57d6e8c77d23d4facf38db1a8d861369dfdc848`

```js
> btoa("bonfida:553e57d6e8c77d23d4facf38db1a8d861369dfdc848")
> 'Ym9uZmlkYTo1NTNlNTdkNmU4Yzc3ZDIzZDRmYWNmMzhkYjFhOGQ4NjEzNjlkZmRjODQ4' // Your base64 encoded token
```

Use this token in `L5` of `index.js`

```js
const tokenBase64 =
  "Ym9uZmlkYTo1NTNlNTdkNmU4Yzc3ZDIzZDRmYWNmMzhkYjFhOGQ4NjEzNjlkZmRjODQ4";
```

<br />
<h2 align="center">Cloudflare worker</h2>
<br />

Go to your [Cloudflare dashboard](https://www.cloudflare.com/en-gb/) and follow the steps described below:

![1](/assets/1.png)

![2](/assets/2.png)

![3](/assets/3.png)

![4](/assets/4.png)

Copy paste the content of `index.js` and enter your base64 encoded token in `L5` and click `Save and Deploy`.

![5](/assets/5.png)

Your Cloudflare worker is now deployed! 🚀

To know how to use the token in your frontend you can refer to the [Strata Foundation repository](https://github.com/StrataFoundation/strata/tree/master/packages/web3-token-auth#web3-token-auth-middleware)
