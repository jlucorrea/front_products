<script setup lang="ts">
import { reactive, toRef, watch } from "vue";
import { useBrandStore } from '@/stores/Brand';

const { showBrandModal, formData } = defineProps(['showBrandModal' ,'formData']);
const emits = defineEmits(['close-modal']); 
const useBrand = useBrandStore();

const form = reactive(formData);

const show = toRef(showBrandModal);

const closeModal = () => {
  useBrand.setModalBrand(false);
  emits('close-modal');
}

const modalBrand = toRef(useBrand, 'modalBrand');

const saveBrand = () => {
  useBrand.saveBrand(form);
}

watch(modalBrand, (newValue, oldValue) => {
  if (newValue === true) {
      closeModal();
  }
});

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
            {{ formData.id ? 'Editar Marca' : 'Registrar Marca' }}
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
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button
              @click.prevent="saveBrand()"
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