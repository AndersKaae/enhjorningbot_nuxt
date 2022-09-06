<script lang="ts" setup></script>
<template>
  <div class="investment">
    <header class="investment-header">
      <h2 class="company-name"><a href="#/company/43129481" class="">Dongsgaard ApS</a></h2>
      <div class="investment_date">2022-09-02</div>
    </header>
    <div class="investment__content">
      <div class="investment__investment">
        <h3 class="investment-box-title">Investment</h3>
        <span class="denomination">DKK</span>
        <span class="values">[6,000,000]</span>
        <div class="investment__type">[Kontant]</div>
      </div>
      <div class="investment__ownership">
        <h3 class="investment-box-title">Share</h3>
        <span class="values">[33.333]</span>
        <span class="denomination">%</span>
      </div>
      <div class="investment__valuation">
        <h3 class="investment-box-title">Valuation</h3>
        <span class="denomination">DKK</span>
        <span class="values">[18,000,000]</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .investment {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 15px #0000001a;
    margin-bottom: 1.25rem;
    position: relative;
    z-index: 2;
}
.company-name {
    font-size: 1.6rem;
    line-height: 1em;
    font-weight: 300;
}
 .investment-header {
    align-items: center;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
}
 .investment_date {
    color: #888;
}

 .investment-box-title {
    font-weight: 400;
    margin-bottom: 1.25rem/2;
}
.investment__company__name {
    font-size: 1.6rem;
    line-height: 1em;
}

a {
    color: #337592;
    text-decoration: none;
}

 .investment-box-title {
    font-weight: 400;
    margin-bottom: 1.25rem/2;
}
 .investment__investment,  .investment__ownership,  .investment__valuation {
    width: 33.3%;
}
 .denomination {
    color: #888;
    font-size: 14px;
    padding-right: 4px;
}

 .investment__content {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.875rem;
}
 .investment__valuation {
    padding: 0 1.25rem;
    text-align: right;
}
 .investment__ownership {
    padding: 0 1.25rem;
    text-align: center;
}
.investment__investment {
    border-left: 2px solid #f7f7f7;
    padding: 0 1.25rem;
}

.values{
  color: #709fb3;
  font-size: 1.2em;
  font-weight: 700;
}
</style>