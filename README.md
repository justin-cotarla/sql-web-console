# SQL Web Console

This project is a bare-bones single-page SQL web console built in React.
It bootstraps [Create React App](https://github.com/facebook/create-react-app).

![preview](https://github.com/justin-cotarla/sql-web-console/blob/master/img/sql-web-console-preview.png)

This application sends plaintext SQL queries wrapped in a JSON object to a `HOST`.
The outgoing request format is as follows:
```
data: {
    query,
}
```  

The following is the expected response format:
```
{
    rows,
    headers,
    error,
}
```

## Setup
1. Install dependencies: `npm install`
2. Start development server: `npm start`

Project runs at [http://localhost:3000](http://localhost:3000)

## Configuration
The application `HOST` and `TITLE` are kept in `.env`. These are *not* secret, and are exposed to users when deployed.