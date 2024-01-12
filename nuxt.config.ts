// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@element-plus/nuxt'],
    app: {
        head: {
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                {name: 'viewport', content: 'width=device-width, initial-scale=1', charset: 'utf-8'}
            ],
            title: 'V2EX'
        }
    }
})
