<script setup>
const props = defineProps(["company"]);
</script>

<template>    
  <th class="header">
      <CompanyTypeIcon :code = "company.business_code" ></CompanyTypeIcon>
      <a class="company_name" v-bind:href="'/company/' + company.cvr">{{ company.name }}</a>
      <!--
      <div>{{ company.increases[0].validFrom }}</div>
      -->
  </th>
  <td>
    <div class="values">
      <span class="denomination">DKK</span>
      <span class="amount">{{ company.increases[company.increases.length -1].investment.toLocaleString() }}</span>
    </div>
  </td>
  <td>
    <div class="values">
      <span class="denomination">DKK</span>
      <span class="amount">{{ company.increases[company.increases.length -1].valuation.toLocaleString() }}</span>
    </div>
  </td>
  <td>
    <div class="values">
      <span class="amount">{{  company.increases.length - 1 }}</span><br>
    </div>
  </td>
</template>

<style scoped>
.header {
  
}
.card-wrapper {
  
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

.title{
  font-weight: 350;
}

.denomination {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #7c7c7c;
}

.amount {
  
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
  }
}

@media (max-width: 639px) {
  .wrapper {
 
  }
}
</style>
