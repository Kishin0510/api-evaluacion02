<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const product = ref({
        name: '',
        price: 0,
        description: '',
        image: ''
})

const createProduct = async () => {
    try {
        const response = await axios.post('/api/products', product.value)
        console.log(response.data)
        product.value = {
            name: '',
            price: 0,
            description: '',
            image: ''
        }
    } catch (error) {
        console.error(error)
    }
}

const fetchProduct = async () => {
    try {
        const response = await axios.get('/api/products')
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

const deleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`/api/products/${id}`)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

const updateProduct = async (id: string) => {
    try {
        const response = await axios.put(`/api/products/${id}`, product.value)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}
</script>
    
}

</script>

<template>
    <div>
        <form @submit.prevent="createProduct">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="product.name" required>
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="product.description" required>
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="product.price" required>
            <button type="submit">Create JSON</button>
        </form>
    </div>
</template>