

export default defineEventHandler(async (event) => {

    const result = await $fetch('/api/item').catch(console.error)

    console.log(result)

    return {
        hello: 'world'
    }
})