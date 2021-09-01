<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light container p-3">
  <a class="navbar-brand" href="#"><img src="./assets/m&s.png"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/"><button type="button" class="btn btn-light m-2 p-2">Unfulfilled Orders</button></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about"><button type="button" class="btn btn-light m-2 p-2">Sender Details</button></router-link>
      </li>
    </ul>
  </div>
    
</nav>
    <router-view />
  </div>
</template>

<style lang="css">
.nav-item:hover{
  border-bottom:3px solid black;
  transform: scale(1.1);
}
#app{
background-color: #f8f9fa;
}
</style>
