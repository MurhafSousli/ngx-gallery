# Contribution

After you clone the repo and install the project dependencies, you should prepare the build setup by running the following command only for the first time:

```bash
npm run prepare-build
```

*This will build and link all the packages.*

***

Use the following command to build each package separately

```bash
npm run build-core
npm run build-lightbox
npm run build-gallerize
```

 > NOTE:  These commands will not set the version in package.json, but they run faster while developing

Use the following command to build all packages

```bash
npm run build-all
```

Test your changes then submit your PR
