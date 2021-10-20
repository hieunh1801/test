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
