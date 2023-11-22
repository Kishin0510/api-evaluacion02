<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const product = ref({
        name: '',
        price: 0,
        description: '',
        image: ''
})

const showAddForm = ref(false);

const products = ref([])

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
        products.value = response.data
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
<template>
        <div>
        <h1>Product View</h1>
        <button @click="showAddForm = !showAddForm">Add Product</button>
        <form @submit.prevent="createProduct">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="product.name" required>
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="product.price" required>
            <label for="description">Description:</label>
            <textarea id="description" v-model="product.description" required></textarea>
            <label for="image">Image:</label>
            <input type="text" id="image" v-model="product.image" required>
            <button type="submit">Create Product</button>
        </form>

        <ul>
            <li v-for="product in products" :key="product.id">
                <h2>{{ product.name }}</h2>
                <p>Price: {{ product.price }}</p>
                <p>Description: {{ product.description }}</p>
                <img :src="product.image" alt="Product Image">
                <button @click="deleteProduct(product.id)">Delete</button>
                <button @click="updateProduct(product.id)">Update</button>
            </li>
        </ul>
    </div>
</template>