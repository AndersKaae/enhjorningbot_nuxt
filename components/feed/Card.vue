<script setup>
const { company } = defineProps({
  company: Object,
});

const isInvestmentCompany = computed(() => {
  let code_int = Number(String(company.business_code).substring(0, 2))
  if (checkboxValues.investmentCompany == false) {
    if (code_int > 0 && code_int < 0) {
      return false;
    } 
  }
  if (checkboxValues.holdingCompany == false) {
    if (code_int > 63 && code_int < 67) {
      return false;
    } 
  }
  if (checkboxValues.realestate == false) {
    console.log(code_int)
    if (code_int > 67 && code_int < 70) {
      return false;
    } 
  }
  return true;
});
</script>

<template >
    <td class="company-date">
      {{ company.increases[company.increases.length - 1].validFrom }}
    </td>
    <td class="company-name">
      <FeedCompanyTypeIcon :code="company.business_code"></FeedCompanyTypeIcon>
      <a v-bind:href="'/company/' + company.cvr">{{ company.name }}</a>
    </td>
    <td class="company-investment" data-label="Investment">
      <div class="values">
        <span class="denomination">DKK</span>
        <span class="amount">{{ company.increases[company.increases.length - 1].investment.toLocaleString() }}</span>
      </div>
    </td>
    <td class="company-valuation" data-label="Valuation">
      <div class="values">
        <span class="denomination">DKK</span>
        <span class="amount">{{ company.increases[company.increases.length - 1].valuation.toLocaleString() }}</span>
      </div>
    </td>
    <td class="company-round" data-label="Round">
      <div class="values">
        <span class="amount">{{ company.number_increases }}</span><br>
      </div>
    </td>
</template>

<style scoped>
tr:hover td {
  border-bottom-color: #555;
}

td,
th {
  background-color: #fff;
  border: 1px solid #ddd;
  border-collapse: collapse;
  padding: 0.5em;
}

.table--feed .company-name a {
  color: #337592;
  text-decoration: none;
}

.table--feed .company-name a:hover {
  text-decoration: underline;
}

.company-investment,
.company-valuation {
  text-align: right;
}

.company-round {
  text-align: center;
}

.denomination {
  color: #666;
  font-size: .75em;
  margin-right: .25em;
}

.amount {
  font-variant: tabular-nums;
  -moz-font-feature-settings: "tnum";
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum"
}

@media (max-width: 640px) {

  td {
    border: none;
    display: block;
    position: relative;
  }

  td:not(.company-name) {
    text-align: right;
  }

  td.company-date {
    font-size: .75em;
    text-align: left;
  }

  .company-investment::before,
  .company-valuation::before,
  .company-round::before {
    content: attr(data-label);
    display: inline-block;
    left: .5em;
    position: absolute;
  }

}
</style>
