Vue.component('search', {
    props: ['userSearch'],
    template:`
    <input type="text" class="search-field" v-model="userSearch">
    `
})