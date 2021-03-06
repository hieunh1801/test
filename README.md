# SpmedPortalDesktop

- [x] Multiple languages https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate

- [x] fxLayout https://tburleson-layouts-demos.firebaseapp.com/#/docs

- [x] web tutorial https://github.com/tnicola/ngx-joyride

## Multiple language

### Use in file .html

- Step 1: Add translate attribute (see detail in link Multiple languages above)

```html
// add translate to tag and specific id( layout.header.spmed-logo )
<p translate>layout.header.spmed-logo</p>
```

- Step 2: Run script to generate key, value

```bash
npm run i18n
```

- Step 3: Translate language in Korean and English in **/assets/i18n/en.json** and **/assets/i18n/kr.json**

### Use in file .ts

```ts
import { TranslateService } from '@ngx-translate/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
...
class Sample {
  constructor(
    private translateService: TranslateService
  ) {}

  test():void {
    const helloWorld = marker("ABC");
    console.log(helloWorld)
  }
}

```

```html
<div>{{helloWorld | translate}}</div>
```

## Chartjs

https://valor-software.com/ng2-charts/#/GeneralInfo

## Deploy to server

```bash

# step 1: build project with production env
npm run build-prod

# step 2: ssh to server
ssh 10.81.103.125

# step 3: rename folder to new version in server
# 10.81.103.125
mv /home/ec2-user/workspace_spmed/spmed-portal-desktop /home/ec2-user/workspace_spmed/spmed-portal-desktop-220106

# step 4: copy all file in folder /dist/spmed-portal-desktop to server
# local
scp -r /home/hieu/Desktop/spmed-pdss-210705/spmed-portal-desktop/dist/spmed-portal-desktop ec2-user@10.81.103.125:/home/ec2-user/workspace_spmed/spmed-portal-desktop

# step 5: service
https://portalapi.spmed.kr/portal/ping
https://gwapi.spmed.kr/api-gateway/v1.0/portal/ping
https://cuapi.spmed.kr/customer-user/ping
https://home.spmed.kr/home
```
