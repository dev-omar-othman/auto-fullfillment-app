<template>
  <div class="container mt-5 p-1 home">
    <div class="container d-flex justify-content-end">
        <button type="button" class="btn btn-primary m-1 refresh" v-on:click="refreshData()">Refresh</button>
        <button type="button" class="btn btn-primary m-1 fulfill" v-on:click="fulfillSheet()">fulfill</button>
    </div>
    <table class="table table-light">
      <thead >
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Total Price</th>
          <th scope="col">Customer</th>
          <!--
          <th scope="col">Destination</th>
          -->
          <th scope="col">Items SKU</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody >
        <ordercomponent v-for="order in unfulfilledOrders"
         :key="order.orderId"
         :id="order.orderId"
         :total_price="order.orderTotalPrice"
         :customer="order.customer"
         :destination="order.destination"
         :itemSku="order.itemsSku"
         :description="order.orderDescription"/>
      </tbody>
    </table>
    
    
  </div>
</template>

<script>
import ordercomponent from '../components/ordercomponent.vue';
import unfulfilledOrders from '../../../JSON/unfulfilledOrders.json';
// @ is an alias to /src
export default {
  data: function() {
    return{
      unfulfilledOrders : unfulfilledOrders,
    };
  },
  methods:{
    refreshData:function(){
      var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8081/getUnfulfilledOrders", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  document.querySelector('.refresh').setAttribute("disabled","true")
    },
    fulfillSheet:function(){
      var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:8081/fulfillSheets", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  document.querySelector('.fulfill').setAttribute("disabled","true")
    },
  },
  components: { ordercomponent },
  name: "Home",
  }
</script>
