<script setup>
const props = defineProps(["company"]);
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <CompanyTypeIcon :code = "company.business_code" ></CompanyTypeIcon>
      <a class="company_name" v-bind:href="'/company/' + company.cvr">{{ company.name }}</a>
      <div>{{ company.increases[0].validFrom }}</div>
    </header>
    <div class="body">
      <div class="section">
        <h3 class="title">Investment:</h3>
        <div class="values">
          <span class="denomination">DKK</span>
          <span class="amount">{{ company.increases[company.increases.length -1].investment.toLocaleString() }}</span>
          <div class="investment_type">Kontant</div>
        </div>
      </div>
      <div class="section">
        <h3 class="title">Valuation:</h3>
        <div class="values">
          <span class="denomination">DKK</span>
          <span class="amount">{{ company.increases[company.increases.length -1].valuation.toLocaleString() }}</span>
        </div>
      </div>
      <div class="section">
        <h3 class="title">Round no.:</h3>
        <div class="values">
          <span class="amount">{{  company.increases.length - 1 }}</span><br>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  align-items: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  padding: 0 1.25rem;
}
.wrapper {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 15px #0000001a;
  position: relative;
  z-index: 2;
  max-width: 700px;
}
.company_name {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: #337592;
  text-decoration: none;
  font-weight: 300;
}

.body {
  padding: 0 1.25rem 1.25rem;
}

.section {
  display: flex;
  align-items: flex-end;
  padding: 1rem 0;
  justify-content: space-between;
}

.title{
  font-weight: 350;
}

.denomination {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #7c7c7c;
}

.amount {
  color: #709fb3;
  font-size: 1.5rem;
}

.investment_type {
  text-align: right;
}

h3 {
  font-size: 1.25em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: 400;
}

@media (min-width: 640px) {
  .wrapper {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 639px) {
  .wrapper {
    margin: 1.25rem; 
  }
}
</style>
