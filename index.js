//// Initial API test
// $.ajax(`https://www.dnd5eapi.co/api/spells/druidcraft`)
// .then((v) => {
//     console.log(v)
// })
const $Search = $('.search')

$Search.on('submit', (event) => {
    // page stop
    event.preventDefault();
    
    // declare constant for jquery & test
    const formData = new FormData(event.target)
    console.log(formData)

    const spell = formData.get('spell')
    console.log(spell)

    //api
    const spellAPI = `https://www.dnd5eapi.co/api/spells/${spell.toLowerCase().replace(' ', '-')}`
    console.log(spellAPI)
    // declare
    const $img = $(".spellSchoolImg")
    const $spellDesRes = $(".spellDesRes")
    const $spellLvlRes = $(".spellLvlRes")
    const $upcastingRes = $(".upcastingRes")
    const $spellComRes = $(".spellComRes")
    const $spellMatRes = $(".spellMatRes")

    // clear results
    $img.empty()
    $spellDesRes.empty()
    $spellLvlRes.empty()
    $upcastingRes.empty()
    $spellComRes.empty()
    $spellMatRes.empty()
    $spellDesRes.html(`<div>Loading...</div>`)

    $.ajax(spellAPI)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            $img.html(`<img src=./magic/${data.school.Name}.jpg>`)
            console.log(data.school.Name)
        })
})