import { defineStore } from 'pinia';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import type { Brand } from '@/model/Type'

export const useBrandStore = defineStore({
  id: 'brand',
  state: () => ({
    brands: [] as Brand[],
    modalBrand: false,

  }),
  actions: {
    // Obtener marcas
    async getBrand(){
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/brands/list`);
          const data = response.data;
          this.brands = data.data;
      } catch (error) {
          console.log('Ocurrio un error', error);
      }
    },
    // Registrar y actualizar marcas
    async saveBrand(form: any){
      const cleanedFormData = JSON.parse(JSON.stringify(form));

      const formData = cleanedFormData;

      if(!formData.name){
          ElMessage.warning('Nombre requerido');
          return;
        }

      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/brands/create`, formData);

          if (response.status === 201) {
              ElMessage({
                message: response.data.message,
                type: "success",
              });
              this.$patch({ modalBrand: true });
              this.getBrand();
          }

      } catch (error) {
          if(error.response.status==422){
            const errorMessages = Object.values(error.response.data.errors).flat().join(', ');
            ElMessage({
              message: errorMessages,
              type: "error",
            });
          }else{
            ElMessage({
              message: error.response,
              type: "error",
            });
          }
      }
    },
    // Eliminar Marca
    async deletBrand(id: number){
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/brands/delete/${id}`);
          if (response.status === 200) {
            ElMessage({
              message: response.data.message,
              type: "success",
            });
            this.getBrand();
          }
      } catch (error) {
        
        ElMessage({
          message: error.response.data.message,
          type: "error",
        });
        
      }
    },
    // Estado modal
    setModalBrand(value: boolean){
      this.modalBrand = value;
  }
  }
});