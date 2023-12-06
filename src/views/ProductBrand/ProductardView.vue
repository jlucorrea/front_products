<script setup lang="ts">
// Importaciones de Vue y otras dependencias
import { ref,onMounted, computed  } from 'vue'
import { useProductStore } from '@/stores/Product';
import ProductModal from '@/components/ProductModal.vue';

// Inicialización de variables y funciones
const useProduct = useProductStore();
const showProductModal = ref(false);
const formData = ref({});
const products = computed(() => useProduct.products);

// Función para abrir el modal con los datos proporcionados
const openModal = (data: {}) => {
  formData.value = data ? { ...data } : {};
  showProductModal.value = true;
}

// Función para cerrar el modal
const closeModal = () => {
    showProductModal.value = false;
}

// Función para eliminar un producto por su ID
const Delete = (id: number) => {
  useProduct.deletBrand(id);
}

// Hook onMounted para cargar las marcas al iniciar el componente
onMounted(async() => {
  await useProduct.getProduct();
})

</script>

<template>

    <div class="mt-3">
      <div class="mb-4">
        <button type="button" class="btn btn-success" @click.prevent="openModal">Add</button>
      </div>
        <table class="table table-bordered">
            <thead>
                <th>#</th>
                <th>Name</th>
                <th>Descriptión</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Action</th>
            </thead>
            <tbody>
              <tr v-for="(row, index) in products" :key="index">
                <td> {{ index+1 }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.price }}</td>
                <td>{{ row.brand.name }}</td>
                <td>
                  <button class="btn btn-warning edit-button" style="margin-right: 10px;" @click.prevent="openModal(row)">
                    Editar
                  </button>
                  <button class="btn btn-danger delete-button" @click.prevent="Delete(row.id)">
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
        </table>
    </div>

    <ProductModal v-if="showProductModal" :show-product-modal="showProductModal" :form-data="formData" @close-modal="closeModal"/>

</template>