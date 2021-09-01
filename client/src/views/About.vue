<template>
    <div class="about">
       <div class="container mt-5">
        <form action="">
            <div class="form-group row mt-2">
                <label for="name" class="col-sm-2 col-form-label">name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" v-model="senderData.contact.name">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="phone" class="col-sm-2 col-form-label">phone</label>
                <div class="col-sm-10">
                    <input type="tel" class="form-control" id="phone" v-model="senderData.contact.phone">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="company" class="col-sm-2 col-form-label">company</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="company" v-model="senderData.contact.company">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="address-line-1" class="col-sm-2 col-form-label">address line 1</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="address-line-1" v-model="senderData.address.address_line1">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="suburb" class="col-sm-2 col-form-label">suburb</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="suburb" v-model="senderData.address.suburb">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="state_name" class="col-sm-2 col-form-label">state name</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="state_name" v-model="senderData.address.state_name">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="postalcode" class="col-sm-2 col-form-label">postal code</label>
                <div class="col-sm-10">
                    <input type="bumber" class="form-control" id="postalcode" v-model="senderData.address.postcode">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="country" class="col-sm-2 col-form-label">country</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="country" v-model="senderData.address.country">
                </div>
            </div>
            <div class="form-group row mt-2">
                <label for="instructions" class="col-sm-2 col-form-label">instructions</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="instructions" v-model="senderData.instructions">
                </div>
            </div>
            <div class="form-group row mt-2">
                <button type="submit" class="btn btn-primary mb-2">Update</button>
            </div>
            
        </form>
        </div>
        {{senderData}}
    </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "about",
data: function(){
    return{
        senderData:{
            "contact":{
                "name":"",
                "phone":"",
                "company":"",
            },
            "address": {
                "address_line1":"",
                "suburb":"",
                "state_name":"",
                "postcode":"",
                "country":"",
            },
            "instructions": ""
        }
    }
}
  }
</script>