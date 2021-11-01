# SpmedPortalDesktop

- [x] Multiple languages https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular-app-with-ngx-translate

- [x] fxLayout https://tburleson-layouts-demos.firebaseapp.com/#/docs

## Multiple language

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

## Deploy to server

```bash

# step 1: build project with production env
npm run build-prod

# step 2: ssh to server
ssh 10.81.103.125

# step 3: rename folder to new version in server
mv /home/ec2-user/workspace_spmed/spmed-portal-desktop /home/ec2-user/workspace_spmed/spmed-portal-desktop-211029

# step 4: copy all file in folder /dist/spmed-portal-desktop to server
scp -r /home/hieu/Desktop/spmed-pdss-210705/spmed-portal-desktop/dist/spmed-portal-desktop ec2-user@10.81.103.125:/home/ec2-user/workspace_spmed/spmed-portal-desktop

```

ec2-user@10.81.103.125
