# Snappy Airlines

<p>
  <img src="packages/snap/images/snappy-air.svg" width="350" title="hover text">
</p>

This repository demonstrates some of the new Interactive UI features available in the MetaMask Snaps Platform. 
Some of the features in this Snap are:
- [onInstall lifecycle hook](https://docs.metamask.io/snaps/reference/permissions/#endowmentlifecycle-hooks)
- [onUpdate lifecycle hook](https://docs.metamask.io/snaps/reference/permissions/#endowmentlifecycle-hooks)
- [Home Page](https://docs.metamask.io/snaps/reference/permissions/#endowmentpage-home)
- [Custom UI](https://docs.metamask.io/snaps/features/custom-ui/)
- Dynamic/Interactive UI

MetaMask Snaps is a system that allows anyone to safely expand the capabilities
of MetaMask. A _snap_ is a program that we run in an isolated environment that
can customize the wallet experience.

## Snaps is pre-release software

To interact with (your) Snaps, you will need to install [MetaMask Flask](https://metamask.io/flask/),
a canary distribution for developers that provides access to upcoming features.

## Getting Started
This project demostrates some of the latest features in Snaps. These features may not yet be available in Metamask Stable. So it is recommended to install [MetaMask Flask](https://docs.metamask.io/snaps/get-started/install-flask/) to try out the examples.

Clone the repository and set up the development environment:

```shell
yarn install && yarn start
```

The dapp is served from : [localhost:8000](http://localhost:8000/)

The snap is served from : [localhost:8080](http://localhost:8080/)

---

### MetaMask Snaps - Builder Series Calls

You can watch the Video recording describing this repo and its code, and other Snaps related videos on the MetaMask Snap YouTube Channel:

https://youtu.be/Uh53e9hLWZg?si=lB5boGN1Ry1WHt5w