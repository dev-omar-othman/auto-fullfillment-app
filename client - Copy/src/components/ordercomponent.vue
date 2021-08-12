<template>

    <tr >
            <th scope="row">{{id}}</th>
            <td>${{total_price}}</td>
            <td>{{customer}}</td>
            <!--<td>{{destination}}</td>-->
            <td><div v-for="item in itemSku" :key="item">{{item}}</div></td>
            <td><div v-for="singleDescription in description" :key="singleDescription">{{singleDescription}}</div></td>
            <td>
              
              <button type="button" class="btn btn-primary m-1"  v-on:click="created()">generate label</button>
              <a  target="_blank"><button type="button" class="btn btn-primary m-1"  >label</button></a>
            </td>
            <div>
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary " data-toggle="modal" :data-target="'#modal'+id.replace('#','')">
                fulfill
              </button>

              <!-- Modal -->
              <div class="modal fade" :id="'modal'+id.replace('#','')" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">order {{id}}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="input-group input-group-sm mb-3">
                        
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" v-model="barcode">
                        <div class="input-group-prepend">
                          <span  class="input-group-text scan-btn" id="inputGroup-sizing-sm" @click="scanBarcode" >scan barcode</span>
                        </div>
                        </div>
                        <ul class="description">
                          <li  v-for="singleDescription in description" :key="singleDescription">{{singleDescription}}</li>
                        </ul>
                        <div v-if="JSON.stringify(this.itemSku) == JSON.stringify(verifiedBarcodes)" class="alert alert-success" role="alert">
                          all items are verified
                        </div>
                      <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-primary active m-2">
                          <input type="radio" name="options" id="option1" value="0.5" v-model="datasetting.weight.value" checked> micro
                        </label>
                        <label class="btn btn-primary m-2">
                          <input type="radio" name="options" id="option2" value="1" v-model="datasetting.weight.value"> mini
                        </label>
                        <label class="btn btn-primary m-2">
                          <input type="radio" name="options" id="option3" value="5" v-model="datasetting.weight.value"> small
                        </label>
                        
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">discard</button>
                      <button v-if="JSON.stringify(this.itemSku) == JSON.stringify(verifiedBarcodes)" type="button" class="btn btn-primary" @click="created" >get label</button>
                      <button v-else type="button" class="btn btn-primary" disabled >get label</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
    </tr>
</template>
<style>
label.btn.btn-primary.m-2.active {
    background-color: green;
}
ul.description{
  padding: 0px 0px 0px 5px;
    font-size: 0.9em;
}
li.verified{
  list-style-type: none !important;
}
li.verified::before{
  content: "\f058"; /* FontAwesome Unicode */
  font-family: FontAwesome;
  margin-right:5px;
  color: green;
  display: inline-block;
}
.scan-btn{
cursor: pointer;

}
</style>
<script>
import axios from "axios";
import vueAxios from "vue-axios";
import Vue from 'vue';
Vue.use(vueAxios, axios)
export default {
  data:function(){
    return {
      barcode:null,
      verifiedBarcodes:[],
      datasetting: {
  "pickup_date": "2021-11-24",
  "first_mile_option": "pickup",
  "description": `${this.description}`,
  "weight": {
    "value": "0.5",
    "units": "lb"
  },
  "customer_reference": "SupBdayPressie",
  "metadata": {
    "your_data": "XYZ123"
  },
  "sender": {
    "contact": {
      "name": "omar othman",
      "phone": "0412 345 678",
      "company": "molly and stitch"
    },
    "address": {
      "address_line1": "123 Gotham Ln",
      "suburb": "Sydney",
      "state_name": "NSW",
      "postcode": "2000",
      "country": "Australia"
    },
    "instructions": "Knock loudly"
  },
  "receiver": {
    "contact": {
      "name": `${this.customer}`,
      "email": "clarkissuper@dailyplanet.xyz",
      "company": "Daily Planet"
    },
    "address": {
      "address_line1": "80 Wentworth Park Road",
      "suburb": "Glebe",
      "state_name": "NSW",
      "postcode": "2037",
      "country": "Australia"
    },
    "instructions": "Give directly to me"
  }
}
    }
  },
  methods:{
    scanBarcode(event){
      for(var index = 0; index< this.itemSku.length ; index++){
        if(this.barcode == this.itemSku[index]){
          this.verifiedBarcodes.push(this.itemSku[index]);
          this.barcode = "";
        event.target.parentElement.parentElement.nextSibling.children[index].classList.add("verified")
        }else if(JSON.stringify(this.itemSku).search(this.barcode) == -1){
          alert("none of the items have the same barcode");
          this.barcode = "";
        }
      }
    },
  created(event) {
  // GET request using axios with error handling
  Vue.axios.get("http://localhost:8081/updateData",{params:{data : JSON.stringify(this.datasetting)}
  })
    .then(response =>{ window.open(response.data.body,"_blank");
    event.target.innerHTML = "order fulfilled";
    event.target.setAttribute("disabled","true");
    })
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
}
  },
  props:["id","total_price","customer","destination","itemSku","description"],
  name: "orderComponent",
}
</script>