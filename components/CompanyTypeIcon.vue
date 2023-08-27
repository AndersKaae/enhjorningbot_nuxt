<script setup>
    const props = defineProps(["code"]);

    let business_code = String(props.code);
    let code_int = Number(business_code.substring(0, 2))
    let icon_name = ref("")
    let tooltip = ref("")

    onBeforeMount(() => {
        GetIconAndToolTip()
    })

    const GetIconAndToolTip = () => {
        // 01-03: Landbrug, jagt, skovbrug og fiskeri
        if (code_int < 4) {
            icon_name = "fa-solid fa-wheat-awn"
            tooltip = "Landbrug, jagt, skovbrug og fiskeri"
        }
        // 05-09: Råstofindvinding
        else if (code_int > 4 && code_int < 10) {
            icon_name = "fa-solid fa-oil-well"
            tooltip = "Råstofindvinding"
        }
        // 10-33: Fremstillingsvirksomhed
        else if (code_int > 9 && code_int < 34) {
            icon_name = "fa-solid fa-industry"
            tooltip = "Fremstillingsvirksomhed"
        }
        // 35-35: El-, gas-, varme- og vandforsyning
        else if (code_int > 34 && code_int < 36) {
                icon_name = "fa-solid fa-industry"
                tooltip = "El-, gas-, varme- og vandforsyning"
            }
            // 36-39: Bygge og anlæg
        else if (code_int > 35 && code_int < 40) {
                icon_name = "fa-solid fa-plug"
                tooltip = "Vandforsyning; kloak- og affaldshåndtering og sanering"
            }
            // 41-43: Bygge og anlæg
        else if (code_int > 39 && code_int < 43) {
                icon_name = "fa-solid fa-building"
                tooltip = "Bygge- og anlægsvirksomhed"
            }
            // 45-47: Handel med motorkøretøjer og motorcykler
        else if (code_int > 42 && code_int < 48) {
                icon_name = "fa-solid fa-car"
                tooltip = "Handel med motorkøretøjer og motorcykler"
            }
            // 49 - 53: Transport
        else if (code_int > 48 && code_int < 54) {
                icon_name = "fa-solid fa-warehouse"
                tooltip = "Engroshandel og handelsmægling, undtagen med motorkøretøjer og motorcykler"
            }
            // 55 - 56: Hotel og restaurationsvirksomhed
        else if (code_int > 54 && code_int < 57) {
                icon_name = "fa-solid fa-utensils"
                tooltip = "Hotel og restaurationsvirksomhed"
            }
            // 58 - 63: Information og kommunikation
        else if (code_int > 57 && code_int < 64) {
                icon_name = "fa-solid fa-at"
                tooltip = "Information og kommunikation"
            }
            // 64 - 66: Finansiering og forsikring
        else if (code_int > 63 && code_int < 67) {
                icon_name = "fa-solid fa-money-bill-wave"
                tooltip = "Finansiering og forsikring"
            }
            // 68 - 68: Ejendomsaktiviteter
        else if (code_int > 67 && code_int < 69) {
                icon_name = "fa-solid fa-home"
                tooltip = "Ejendomsaktiviteter"
            }
            // 69 - 75: Liberale, videnskabelige og tekniske tjenesteydelser
        else if (code_int > 68 && code_int < 76) {
                icon_name = "fa-solid fa-briefcase"
                tooltip = "Liberale, videnskabelige og tekniske tjenesteydelser"
            }
            // 77 - 82: Administrative og support serviceaktiviteter
        else if (code_int > 76 && code_int < 83) {
                icon_name = "fa-solid fa-briefcase"
                tooltip = "Administrative og support serviceaktiviteter"
            }
            // 84 - 84: Offentlig administration og forsvar; socialforsikring
        else if (code_int > 83 && code_int < 85) {
                icon_name = "fa-solid fa-briefcase"
                tooltip = "Offentlig administration og forsvar; socialforsikring"
            }
            // 85 - 85: Undervisning
        else if (code_int > 84 && code_int < 86) {
                icon_name = "fa-solid fa-graduation-cap"
                tooltip = "Undervisning"
            }
            // 86 - 88: Sundhedsvæsen og socialvæsen
        else if (code_int > 85 && code_int < 89) {
                icon_name = "fa-solid fa-stethoscope"
                tooltip = "Sundhedsvæsen og socialvæsen"
            }
            // 90 - 93: Kunst, underholdning og kultur
        else if (code_int > 89 && code_int < 94) {
                icon_name = "fa-solid fa-theater-masks"
                tooltip = "Kunst, underholdning og kultur"
            }
            // 94 - 96: Andre serviceydelser
        else if (code_int > 93 && code_int < 97) {
                icon_name = "fa-solid fa-question"
                tooltip = "Andre serviceydelser"
            }
            // 97 - 98: Private husholdninger med ansat personale
        else if (code_int > 96 && code_int < 99) {
                icon_name = "fa-solid fa-broom"
                tooltip = "Private husholdninger med ansat personale"
            }
            // 99 - 99: Ekstra territoriale organisationer og organer
        else if (code_int == 99) {
                icon_name = "fa-solid fa-building-ngo"
                tooltip = "Ekstra territoriale organisationer og organer"
            }
        else {
            icon_name = "fa-solid fa-question"
            tooltip = "Ukendt"
        }
    } 
</script>

<template>
    <span class="square">
        <span class="content" :title="code_int + ': ' + tooltip">
            <font-awesome-icon :icon="icon_name" :title="code_int + ': ' + tooltip"/>
        </span>
    </span>
</template>

<style scoped>
.square {
    background: #337592;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: .5em;
    padding: 4px 2px 0;
    text-align: center;
}
.content {
    text-align: center;
    color: #fff;
}
</style>