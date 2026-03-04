# AESC Components

Esta librería es una base reutilizable de Web Components basada en Lit, con estilos compilados con Tailwind CSS e inyectados dentro del Shadow DOM.

## Instalación

La librería está pensada para publicarse como paquete. En consumo local, compila con:

- `npm run build`

## Uso

```ts
import '@aesc/components/button';
```

```html
<ae-button variant="primary">Continuar</ae-button>
```

## Tailwind dentro de Shadow DOM

Los componentes incluyen un set de estilos Tailwind ya compilado y lo aplican mediante `static styles`, por lo que los estilos no dependen de hojas globales del host.
