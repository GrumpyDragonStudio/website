# website
Alpaca Games Website

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# https

certbot + nginx

lwbsyz@gmail.com

www.alpacagames.us market.alpacagames.us

scp -i '/Users/liwb/workspace/alpaca/keystore/server/alpacawebsite_azure.pem' ./dist.zip liwb@172.190.230.136:/home/liwb/uploads

unzip public.zip

sudo rsync -rtvu --delete --exclude-from /home/liwb/uploads/sync_website_exclude.txt /home/liwb/uploads/dist/ /var/www/html/

exclude example:
```
__MACOSX
```

dns
301 alpacagames.us -> https://www.alpacagames.us