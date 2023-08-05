const fetchContent = async () => {
    try{
        const response = await fetch('http://localhost:3500/fetch')
        const data = await response.json()
        console.log(data)
    } catch(err){
        console.error("failed")
    }
}
document.querySelector('button').addEventListener('click',fetchContent)
// fetchContent()