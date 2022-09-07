<template>
    <div class="container">
        <header class="companyName">Legal Desk ApS</header>
        <div class="company-meta">
            <ul>
                <li class="company-cvr">
                    <span class="label">CVR-no:</span><span><a href="https://datacvr.virk.dk/enhed/virksomhed/39202484" target="_blank" title="Besøg på virk.dk">39202484</a></span>
                </li>
                <li class="company-founded">
                    <span class="label">Founded:</span><span>2018-01-02</span>
                </li>
                <li class="company-area">
                    <span class="label">Industry:</span><span>Engroshandel med elektronisk udstyr</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span class="label">C-suite:</span><span><span>DIREKTØR: Anne-Marie Linde <br></span><span>ADM. DIR.: Mette Choon Kim Spedtsbjerg Kristensen <br></span></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.container{
    padding-top: 30px;
    padding-left: 60px;
    padding-right: 60px;
    line-height: 2;
    position: relative;
    font-family: Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
}
.companyName {
    font-size: 2em;
    font-weight: 300;
}
.company-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
}
.company-meta ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 45%;
}
.label {
    width: 250px;
}
</style>
