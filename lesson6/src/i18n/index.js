import vocabs from "./vocabs"
console.log(vocabs)
export default (val, lang)=> {
    const  translatedString = vocabs[lang] && vocabs[lang][val];
    return translatedString || val
}