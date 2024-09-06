import { Character } from "../lib/definitions";

export default function getData( url:string, allData = []): Promise<Character[]> {
    return new Promise((resolve, reject) => fetch(url)
      .then(response => {
          if (response.status !== 200)  {
            throw `${response.status}: ${response.statusText}`;
          }
          response.json().then(data => { 
            allData = allData.concat(data.results);
            if(data.info.next) {
              getData(data.info.next, allData).then(resolve).catch(reject)
            } else {
              resolve(allData);
            }
          }).catch(reject);
      }).catch(reject));
  }
  