<script setup lang="ts">
import { reactive, toRef, watch, computed, onMounted } from "vue";
import { useProductStore } from '@/stores/Product';
import { useBrandStore } from '@/stores/Brand';

const { showProductModal, formData } = defineProps(['showProductModal' ,'formData']);
const emits = defineEmits(['close-modal']); 
const useProduct = useProductStore();
const useBrand = useBrandStore();

const form = reactive(formData);

const show = toRef(showProductModal);

const brands = computed(() => useBrand.brands);

const closeModal = () => {
  useProduct.setModalProduct(false);
  emits('close-modal');
}

const modalProduct = toRef(useProduct, 'modalProduct');

const saveProduct = () => {
  useProduct.saveProduct(form);
}

watch(modalProduct, (newValue, oldValue) => {
  if (newValue === true) {
      closeModal();
  }
});


onMounted(async() => {
  await useBrand.getBrand();
})

</script>

<template>
  <div
    class="modal fade show"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    id="agregar-datos"
    tabindex="-1"
    v-if="show"
  >
    <div class="modal-dialog modal-editar-dialog">
      <div class="modal-content modal-width justify-content-end modal-editar">
        <div class="modal-header">
          <h5
            class="modal-title w-100 border-bottom text-black"
            id="exampleModalLabel"
          >
            {{ formData.id ? 'Editar Producto' : 'Registrar Producto' }}
          </h5>
          <button
            @click="closeModal"
            class="btn-close"
            aria-label="Cerrar"
          ></button>
        </div>
        <div class="modal-body form-editar me-3">
          <div class="mb-2">
            <strong>Nombre</strong>
            <div class="form-control-wrap">
              <input
                v-model="formData.name"
                type="text"
                class="form-control editar-input"
              />
            </div>
            
            <div class="form-control-wrap">
              <strong>Precio</strong>
              <input
                v-model="formData.price"
                type="number"
                class="form-control editar-input"
              />
            </div>
            <div class="form-control-wrap">
              <strong>Descripción</strong>
              <input
                v-model="formData.description"
                type="text"
                class="form-control editar-input"
              />
            </div>
            <div class="form-control-wrap">
              <strong>Marcas</strong>
              <select v-model="form.brand_id" class="form-select" aria-label="Default select example">
                  <option v-for="brand in brands" :value="brand.id" :key="brand.id">{{ brand.name }}</option>
              </select>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button
              @click.prevent="saveProduct()"
              class="btn btn btn-warning mb-3 mt-2 b-aceptar d-flex align-items-center justify-content-center text-dark fs-6"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>