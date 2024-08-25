# SETUP ON LOCAL

1. Install node (> v18 required)
2. npm i (install packages in project)
3. npm run dev (run app local)
4. npm run server (run mock apis on port:5000 - only work for node > 18.0)

# FRAMEWORKS

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Styling

Antd Framework is being used
https://ant.design/

# GIT BRANCHING

## Github Flow/ Scaled Trunk Based Development

- https://docs.github.com/en/get-started/using-github/github-flow (tbc for step 5)
- https://trunkbaseddevelopment.com/
- https://medium.com/@sreekanth.thummala/choosing-the-right-git-branching-strategy-a-comparative-analysis-f5e635443423

# CI/CD

- linting :white_check_mark:
- testing
- npm audit
- deploy to s3 :white_check_mark:
- cloudfront

resources:

- https://dholmes.co.uk/blog/github-actions-frontend-code-quality/
- https://medium.com/cloud-native-daily/mastering-ci-cd-deploying-a-react-js-app-to-aws-s3-with-github-actions-and-hosting-it-b1ce82360331
- https://dev.to/aws-builders/setup-cloudfront-amazon-s3-to-deliver-objects-on-the-web-apps-securely-efficiently-2gnk
