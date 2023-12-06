<script setup lang="ts">
// Importaciones de Vue y otras dependencias
import { ref,onMounted, computed  } from 'vue'
import { useBrandStore } from '@/stores/Brand';
import BrandModal from '@/components/BrandModal.vue';

// Inicialización de variables y funciones
const useBrand = useBrandStore();
const showBrandModal = ref(false);
const formData = ref({});
const brands = computed(() => useBrand.brands);

// Función para abrir el modal con los datos proporcionados
const openModal = (data: {}) => {
  formData.value = data ? { ...data } : {};
  showBrandModal.value = true;
}

// Función para cerrar el modal
const closeModal = () => {
  showBrandModal.value = false;
}

// Función para eliminar una marca por su ID
const Delete = (id: number) => {
  useBrand.deletBrand(id);
}

// Hook onMounted para cargar las marcas al iniciar el componente
onMounted(async() => {
  await useBrand.getBrand();
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
                <th>Action</th>
            </thead>
            <tbody>
              <tr v-for="(row, index) in brands" :key="index">
                <td> {{ index+1 }}</td>
                <td>{{ row.name }}</td>
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
    <BrandModal v-if="showBrandModal" :show-brand-modal="showBrandModal" :form-data="formData" @close-modal="closeModal"/>
</template>@/stores/Brand