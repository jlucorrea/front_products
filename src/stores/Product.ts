import { defineStore } from 'pinia';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import type { Product } from '@/model/Type'

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [] as Product[],
    modalProduct: false,

  }),
  actions: {
    // Obtener productos
    async getProduct(){
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/list`);
          const data = response.data;
          this.products = data.data;
      } catch (error) {
          console.log('Ocurrio un error', error);
      }
    },
    // Registrar y actualizar producto
    async saveProduct(form: any){
      const cleanedFormData = JSON.parse(JSON.stringify(form));

      const formData = cleanedFormData;

      if(!formData.name){
        ElMessage.warning('Nombre requerido');
        return;
      }

      if(!formData.price){
        ElMessage.warning('Precio requerido');
        return;
      }

      if(!formData.description){
        ElMessage.warning('El campo descripción es obligatorio');
        return;
      }

      if(!formData.brand_id){
        ElMessage.warning('Seleccione una marca');
        return;
      }

      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/create`, formData);

          if (response.status === 201) {
              ElMessage({
                message: response.data.message,
                type: "success",
              });
              this.$patch({ modalProduct: true });
              this.getProduct();
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
    // Eliminar productos
    async deletProduct(id: number){
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/delete/${id}`);
          if (response.status === 200) {
            ElMessage({
              message: response.data.message,
              type: "success",
            });
            this.getProduct();
          }
      } catch (error) {
        
        ElMessage({
          message: "Error al realizar esta operación",
          type: "error",
        });
      }
    },
    // Estado modal
    setModalProduct(value: boolean){
      this.modalProduct = value;
  }
  }
});