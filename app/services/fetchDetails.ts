export default async function fetchDetails(url:string) {
    const response = await fetch(url)
    const data = await response.json()
    if(!response.ok) {
        throw new Error("Failed to fetch data")
    }
    return data
  }