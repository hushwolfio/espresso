# React Template（⚡️）

⚡️ A minimal React Vite starter template.

## Feature

- ⚡️ Fast - Build tools based on vite.
- 👻 Small - Based on the smallest runnable build.
- 💄 Prettier - Integrated Prettier to help you format the code.
- ✅ Safety - Https is enabled by default.
- 😎 Reliable - Integrated eslint and commitlint.
- 🤖 Intelligent - Integrated renovate to help you maintain the dependent version.

## Preview

[![qekup8.png](https://s1.ax1x.com/2022/03/20/qekup8.png)](https://imgtu.com/i/qekup8)

## Getting Started

```bash
npx degit lzm0x219/template-vite-react myapp

cd myapp

git init
```

### Prerequisites

- `npm` and `pnpm` should be installed.
- `git` should be installed (recommended v2.4.11 or higher)

### Available scripts

#### `pnpm dev`

Runs the app in development mode.
Open https://localhost:5173 to view it in the browser.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

#### `pnpm build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.

### Improvements that could be made if I took more time to work on this

- Use Tailwind CSS to reduce inline css styles (learning Tailwind CSS at the moment), chose not to do styled components since there wasn't much styling needed in this UI design I went with.
- Learn more about MetaMask and Ethers (v5 vs v6 lead to some confusion in how some functionalities worked which lead to problems in debugging with v6, rolledback to v5)
- Catching MetaMask errors, tried several different methods including adding a promise after the function call but no luck in catching the error itself.
- Jest/React Testing Library does not like ethers.js atm, need to do more research on how to get any tests to pass with ethers.js integrated in those components.
