# Animation Module

## Polyfill

It is possible to polyfill the Intersection Observer in older browsers.

There are several solutions I do however suggest you use this, made by google.
[Link](https://github.com/Epenance/ngx-animate-in#polyfill)

Installing the polyfill:

```bash
npm install intersection-observer
```

Then import it in your `polyfills.ts` if you're using Angular CLI. If you aren't, simply add it to one of your top level ts files such as main.ts like this:

```
import 'intersection-observer'
```

## Custom CSS

## References

- [animate.style](https://github.com/animate-css/animate.css/blob/main/animate.css)
- [animate.style demo](https://animate.style/)
