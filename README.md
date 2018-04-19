# Jumpcut Assignment

## Server
### Environment Variables
The following environment variables must be provided for the server to run correctly

Oxford Dictionaries API
- OXFORD_APP_ID
- OXFORD_APP_KEY

Listening Port
- PORT - client expects the port to be 3001

### Sample Run
#### Mac / Linux
``` shell
cd server;
yarn install;
OXFORD_APP_ID="" OXFORD_APP_KEY="" PORT=3001 yarn start
```

#### Windows
``` powershell
cd server;
yarn install;
%{ $env:OXFORD_APP_ID=""; $env:OXFORD_APP_KEY=""; $env:PORT=""; yarn start }
```

## Client
React app built with create-react-app and React Bootstrap.

### Sample Run
#### Mac / Linx
``` shell
cd client;
yarn install;
yarn start;
```

#### Windows
``` powershell
cd server;
yarn install;
yarn start;
```

